define([
    "marionette",
    "underscore",
    "text!templates/geo-layout.html"
], function (Marionette, _, geoLayoutHtml) {
    return Marionette.LayoutView.extend({
        template: _.template(geoLayoutHtml),
        regions: {
            leftColumnRegion: ".left-column-region",
            rightColumnRegion: ".right-column-region",
        },
    })
})