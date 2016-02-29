define([
    "marionette",
    "underscore",
    "views/main-menu.view",
    "text!templates/main-layout.html"
], function (Marionette, _, MainMenuView, mainLayoutHtml) {

    return Marionette.LayoutView.extend({
        className: "container main-layout",
        template: _.template(mainLayoutHtml),
        regions: {
            topRegion: ".top-region",
            "mainRegion": "main"
        },

        initialize: function () {
        },

        onAttach: function () {
            var mainMenu = new MainMenuView();

            this.getRegion("topRegion").show(mainMenu);
        }
    });
});