define([
    "marionette",
    "underscore",
    "wordpress-api"
], function (Marionette, _, api) {
    return Marionette.AppRouter.extend({
        appRoutes: {
            "": "startPage",
            "geo-posts": "geoPosts"
        },

        routes: {
            "authorize": "authorizeUser",
            'access_token=:token&expires_in=:expires&token_type=:type&site_id=:siteId': "accessToken"
        },

        authorizeUser: function () {
            api.getToken();
        },

        accessToken: function (token, expires, type, siteId) {
            api.setAuth({
                token: token,
                expires: expires,
                type: type,
                siteId: siteId
            }, _.bind(function () {
                this.navigate("", {trigger: true, replace: true});
            }, this), function () {
                throw "Error while processing authorization data!";
            });

        }
    });
});