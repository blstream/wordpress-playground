define([
    "marionette",
    "underscore",
    "text!templates/auth-info.html"
], function (Marionette, _, authInfoHtml) {
    return Marionette.ItemView.extend({
        template: _.template(authInfoHtml)
    });
});