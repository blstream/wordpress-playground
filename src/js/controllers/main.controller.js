define([
    "marionette",
    "backbone",
    "underscore",
    "controllers/geo.controller",
    "views/auth-info.view"
], function (Marionette, Backbone, _, GeoController, AuthInfoView) {
    return Marionette.Object.extend({

        initialize: function () {
            this.mainLayout = this.getOption("mainLayout");
        },

        startPage: function () {
            
        },

        // Start geoPost subapp
        // Needs authorization
        geoPosts: function () {
            var geoController = new GeoController({
                mainLayout: this.mainLayout
            });

            geoController.start();
        },

        showNoAuthTokenInfo: function () {
            this.mainLayout
            .getRegion("mainRegion")
            .show(new AuthInfoView({
                model: new Backbone.Model({
                    msg: "Need api token here! Sign in to get a token."
                })
            }));
        }
    });
});