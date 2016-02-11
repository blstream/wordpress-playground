define([
    "backbone",
    "localstorage"
], function (Backbone, LocalStorage) {

    return Backbone.Model.extend({
        defaults: {
            id: "tokenData",
            accessToken: null,
            clientId: "44574",
            redirectUrl: "http://dev.local:8080",
            expiresIn: "",
            type: "",
            responseType: "token",
            siteId: ""
        },
        localStorage: new LocalStorage()
    });
});