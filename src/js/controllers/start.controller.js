define([
    "marionette",
    "views/start/start-layout.view"
], function (Marionette, StartLayout) {
    return Marionette.Object.extend({
        initialize: function () {
            this.startLayout = new StartLayout();

            this.getOption("mainLayout")
            .getRegion("mainRegion")
            .show(this.startLayout);
        },

        start: function () {}
    });
});