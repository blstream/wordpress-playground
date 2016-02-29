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
            getMoreBtn: ".js_get-more"
        },
        
        childEvents: {
            "click": function (e, childView) {
                switch (childView.model.get("status")) {
                    case "ready": 
                        childView.model.set("status", "pending")
                        this.trigger("get:blog-posts", childView.model);
                        
                    break;
                    case "done": 
                        this.trigger("show:map", childView.model.get("geoData"));
                    break;
                }
            }
        },

        events: {
            "click @ui.getMoreBtn": function () {
                this.trigger("get:more-blogs");
            }
        }
    });
});