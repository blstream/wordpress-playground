define([
    "marionette",
    "underscore",
    "text!templates/start-layout.html"
], function (Marionette, _, startLayoutHtml) {
    return Marionette.LayoutView.extend({
        template: _.template(startLayoutHtml)
    })
});