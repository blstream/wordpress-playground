require(["jquery", "backbone", "app", "wordpress-api"], function ($, Backbone, App, api) {
    $(document).ready(function() {
        var app = new App();

        app.on("start", function() {
            Backbone.history.start();
        });

        api.init()
        .always(function () {
            app.start();
        });

    });
});