define([
    "marionette",
    "underscore",
    "views/geo-posts/blog-item.view",
    "text!templates/blogs-list.html"
], function (Marionette, _, BlogItemView, blogsListHtml) {

    return Marionette.CompositeView.extend({
        template: _.template(blogsListHtml),
        childView: BlogItemView,
        childViewContainer: ".list-container",

        ui: {
            getMoreBtn: "js_refresh"
        },
        
        childEvents: {
            "show:map": function (e, childView) {
                if (childView.model.get("status") === "done") {
                    console.log("child clicked", arguments)
                    this.trigger("show:geo-map", childView.model.get("geoData"));
                }
            }
        },

        events: {
            "click @ui.getMoreBtn": function () {
                this.trigger("refresh");
            }
        }

    });
})