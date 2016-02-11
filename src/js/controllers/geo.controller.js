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

        _loadPosts: function (blogModel, postsOffset) {
            postsOffset = postsOffset || 0;

            var siteId = blogModel.get("blog_id");

            api.getGeoPostsInfo(siteId, postsOffset)
            .then(function (response) {
                var posts = response[0].posts,
                    geoData = _.filter(posts, function (post) {
                        return !!post.geo;
                    });
                
                blogModel.set({
                    "scannedPosts": postsOffset,
                    "geoData": blogModel.get("geoData").concat(geoData)
                });

                return response;
            })
            .then(_.bind(function (response) {
                
                if (postsOffset < response[0].found) {
                    postsOffset += 10;
                    this._loadPosts(blogModel, postsOffset);
                } else {
                    blogModel.set("status", "done");
                }

            }, this));
        },

        _loadBlogs: function (collection) {

            return api.getRecommendationBlogs()
            .then(_.bind(function (response) {
                var newBlogs = response.blogs;

                collection.reset(response.blogs);

                collection.forEach(function (blogModel) {

                    this._loadPostsCount(blogModel)
                    .done(_.bind(this._loadPosts, this));

                }, this);
            }, this));
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

            this.listenTo(blogsListView, "refresh", function () {
                this._loadBlogs(this.blogsCollection);
            });

            this.listenTo(blogsListView, "show:geo-map", function (geoData) {
                if (!_.isEmpty(geoData)) {
                    console.log("show map!!!!", geoData);
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