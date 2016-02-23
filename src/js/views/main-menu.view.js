define([
    "marionette",
    "underscore",
    "text!templates/main-menu.html",
    "wordpress-api"
], function (Marionette, _, mainMenuHtml, api) {
    return Marionette.ItemView.extend({
        template: _.template(mainMenuHtml),

        ui: {
            authorizeBtn: ".js_authorize"
        },

        events: {
            "click @ui.authorizeBtn": function (e) {
                if (api.isAuthorized()) {
                    e.preventDefault();
                    api.removeToken();
                }
            }
        },

        initialize: function () {
            api.listenForToken(_.bind(function () {
                this.toggleSigning();
            }, this));
        },

        setSignOut: function () {
            this.ui.authorizeBtn.addClass("btn-primary").removeClass("btn-default").text("Sign out");
        },

        setSignIn: function () {
            this.ui.authorizeBtn.addClass("btn-default").removeClass("btn-primary").text("Sign In");
        },

        toggleSigning: function () {
            this[api.isAuthorized() ? "setSignOut" : "setSignIn"]();
        },

        onAttach: function () {
            this.toggleSigning();
        }
    });
});