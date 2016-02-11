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

        onAttach: function () {
            if (api.isAuthorized()) {
                this.ui.authorizeBtn.addClass("btn-primary").text("Authorized");
            }
        }
    });
});