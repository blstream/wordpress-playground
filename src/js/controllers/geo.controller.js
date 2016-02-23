define([
    "marionette",
    "underscore",
    "wordpress-api",
    "views/geo-posts/blogs-list.view",
    "views/geo-posts/map.view"
], function (Marionette, _, api, BlogsListView, MapView) {
    return Marionette.Object.extend({

        initialize: function () {
            this.mainLayout = this.getOption("mainLayout");
            this.blogsCollection = new Backbone.Collection();
            this.geoData = {};

            this.blogsCollection.on("add", function (blogModel, collection) {
                console.log("on blogs add", arguments);
                this._loadPostsCount(blogModel)
                .done(_.bind(this._loadPosts, this));
            }, this);
        },

        onDestroy: function () {
            this.mainLayout.destroy();
        },

        _loadPostsCount: function (blogModel) {
            return api.getPostsCount(blogModel.get("blog_id"))
            .then(function (response) {
                blogModel.set("postCount", response.counts.all.publish);
                return blogModel;
            });
            
        },

        _loadPosts: function (blogModel, postsPage) {
            postsPage = postsPage || 0;

            var siteId = blogModel.get("blog_id"),
                postsPerPage = 50,
                postsScanned;

            api.getGeoPostsInfo(siteId, postsPage, postsPerPage)
            .then(function (response) {
                var posts = response[0].posts,
                    geoData = _.filter(posts, function (post) {
                        return !!post.geo;
                    }),
                    postsScanned = blogModel.get("scannedPosts") + response[0].posts.length;
                
                blogModel.set({
                    "scannedPosts": postsScanned,
                    "geoData": blogModel.get("geoData").concat(geoData)
                });

                response[0].scannedPosts = postsScanned;

                return response;
            })
            .then(_.bind(function (response) {
                console.log(response[0].found, response[0].scannedPosts, postsPage);
                if (response[0].scannedPosts < response[0].found) {
                    postsPage++;
                    this._loadPosts(blogModel, postsPage);
                } else {
                    blogModel.set("status", "done");
                }

            }, this));
        },

        _loadBlogs: function (collection) {

            return api.getRecommendationBlogs()
            .done(function (response) {
                var blogsArr = response.blogs;
                
                // set blogs id to perform smart collection update
                blogsArr.forEach(function (blog) {
                    blog.id = blog.blog_id;
                });

                collection.add(blogsArr);
            });
        },

        start: function () {
            var blogsListView = this.getBlogsListView();

            this.mainLayout.getRegion("leftColumnRegion")
            .show(blogsListView);

            this._loadBlogs(this.blogsCollection);
        },

        getBlogsListView: function () {
            var blogsListView = new BlogsListView({
                collection: this.blogsCollection
            });

            this.listenTo(blogsListView, "get-more-blogs", function () {
                this._loadBlogs(this.blogsCollection);
            });

            this.listenTo(blogsListView, "show:geo-map", function (geoData) {
                if (!_.isEmpty(geoData)) {
                    this.showMap(geoData);
                }
            });

            return blogsListView;
        },

        getMapView: function (geoData) {
            return new MapView({
                geoData: geoData
            });
        },

        showMap: function (geoData) {
            var mapView = this.getMapView(geoData);

            this.mainLayout.getRegion("rightColumnRegion")
            .show(mapView);
        }
    });
})