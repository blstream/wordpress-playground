define([
    "marionette",
    "underscore",
    "text!templates/blog-item.html"
], function (Marionette, _, blogItemHtml) {

    return Marionette.ItemView.extend({
        tagName: "button",
        className: "list-group-item",
        template: _.template(blogItemHtml),

        ui: {
            "geoLabel": ".js_geo-label"
        },

        triggers: {
            "click": "show:map"
        },

        templateHelpers: function () {
            return {
                getScannedPercent: function () {
                    var progress = (this.scannedPosts / this.postCount) * 100;
                    return ( (progress > 100? 100 : progress) || 0).toFixed(2) + "%";
                },
                geoCount: function () {
                    return this.geoData.length;
                }
            }
        },

        initialize: function () {
            this.model.set({
                postCount: 0,
                scannedPosts: 0,
                geoFound: 0,
                geoData: [],
                status: "pending"
            }, {silent: true});

            this.model.on("change:geoFound change:status change:postCount change:scannedPosts", this.render);
            this.model.on("change:geoData", function (model, value) {
                this.set("geoFound", value.length);
            });

            this.model.on("change:status", function (model, value) {

            });

        }
    });
})