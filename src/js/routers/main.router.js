define([
    "marionette",
    "wordpress-api"
], function (Marionette, api) {
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
            api.setAuth(token, expires, type, siteId);
            this.navigate("", {trigger: true, replace: true});
        }
    });
});