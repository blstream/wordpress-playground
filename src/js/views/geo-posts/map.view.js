define([
    "marionette",
    "underscore",
    "google-maps",
    "text!templates/map-view.html"
], function (Marionette, _, GmapsLoader, mapViewHtml) {

    return Marionette.ItemView.extend({
        template: _.template(mapViewHtml),

        ui: {
            mapContainer: ".js_map-container"
        },

        onAttach: function () {
            GmapsLoader.load(_.bind(this.showMapWithMarkers, this));
        },

        showMapWithMarkers: function(google) {
            var map = new google.maps.Map(this.ui.mapContainer.get(0), {
                center: {lat: 0, lng: 0},
                scrollwheel: false,
                zoom: 2
            });

            this.getOption("geoData").forEach(function (item) {
                new google.maps.Marker({
                    map: map,
                    position: {lat: item.geo.latitude, lng: item.geo.longitude},
                    title: item.geo.address
                });
            });

        },

        beforeDestroy: function () {
            GmapsLoader.release(function () {
                console.log("maps unloaded");
            });
        }
    });
});