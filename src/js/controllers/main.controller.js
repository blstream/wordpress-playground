define([
    "marionette",
    "backbone",
    "underscore",
    "controllers/geo.controller"
], function (Marionette, Backbone, _, GeoController, api, BlogsListView) {
    return Marionette.Object.extend({

        initialize: function () {
            this.mainLayout = this.getOption("mainLayout");
        },
        startPage: function () {
            
        },

        geoPosts: function () {
            var geoController = new GeoController({
                mainLayout: this.mainLayout
            });

            geoController.start();
        }
    });
});