define([
    "jquery",
    "backbone",
    "marionette",
    "models/auth-info.model"
], function ($, Backbone, Marionette, AuthInfoModel) {
    
    var authInfo = new AuthInfoModel(),
        get = function (url) {
            var def = $.Deferred();

            $.get(url, function () {
                def.resolve(arguments);
            });

            return def;
        },
        authorizedGet = function (url) {
            var def = $.Deferred();

            $.ajax( {
                url: url,
                type: "GET",
                beforeSend : function( xhr ) {
                    xhr.setRequestHeader("Authorization", "BEARER " + authInfo.get("accessToken"));
                },
                success: function( response ) {
                    def.resolve(response);
                }
            });

            return def;
        };

    return {

        getPosts: function (siteId) {
            var url = "https://public-api.wordpress.com/rest/v1.1/sites/" + siteId + "/posts?offset=10";
            return get(url);
        },

        getGeoPostsInfo: function (siteId, nextPage, postsPerPage) {
            nextPage = nextPage || 0;
            var url = "https://public-api.wordpress.com/rest/v1.1/sites/" + siteId + "/posts?fields=geo&number=" + postsPerPage + "&page=" + nextPage ;
            return get(url);
        },

        getPostsCount: function (siteId) {
            var url = "https://public-api.wordpress.com/rest/v1.1/sites/"+ siteId +"/post-counts/post";

            return authorizedGet(url);
        },

        getRecommendationBlogs: function () {
            var url = "https://public-api.wordpress.com/rest/v1.1/read/recommendations/mine?number=5";

            return authorizedGet(url);
        },

        setAuth: function (data, successCb, errorCb) {

            authInfo.save({
                accessToken: data.token,
                expiresIn: data.expires,
                type: data.type,
                siteId: data.siteId
            }, {
                success: successCb,
                error: errorCb
            });
        },

        getToken: function () {
            var url = "https://public-api.wordpress.com/oauth2/authorize";
            url += "?client_id=" + authInfo.get("clientId");
            url += "&redirect_uri=" + authInfo.get("redirectUrl");
            url += "&response_type=" + authInfo.get("responseType");

            window.location = url;
        },

        removeToken: function (callback) {
            authInfo.set(authInfo.defaults)
            authInfo.save({}, {
                success: callback
            });
        },

        isAuthorized: function () {
            return authInfo.get("accessToken") !== null;
        },

        listenForToken: function (callback) {
            authInfo.on("change:accessToken", callback);
        },

        init: function () {
            var def = $.Deferred();

            authInfo.fetch({
                success: def.resolve,
                error: def.reject
            });

            return def;
        }

    };
});