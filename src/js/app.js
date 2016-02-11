define([
    "marionette",
    "underscore",
    "layouts/main.layout",
    "routers/main.router",
    "controllers/main.controller"
], function (Marionette, _, MainLayout, MainRouter, MainController) {
    
    return Marionette.Application.extend({

        initialize: function () {

            var RootView = Marionette.LayoutView.extend({
                template: _.template("<div class='main-region'></div>"),
                el: "#app-container",
                regions: {
                    main: ".main-region"
                }
            });

            this.rootView = new RootView();
        },

        onStart: function () {
            var mainLayout = new MainLayout(),
                mainController = new MainController({
                    mainLayout: mainLayout
                });

            this.rootView.render();

            mainLayout.on("show", function () {
                new MainRouter({
                    controller: mainController
                });
            });

            this.rootView.getRegion("main").show(mainLayout);
        }
    });
});