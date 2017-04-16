//= service/index.js
//= controllers/index.js

angular.module("TooltipsApp", ["TooltipApp.Ctrl", "TooltipApp.service", "ngRoute"])
    .config(($routeProvider, $httpProvider) => {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

        $routeProvider
            .when("/", {
                templateUrl: "view/home/home.html"
            })
            .when("/admin", {
                templateUrl: "view/admin/admin.html",
                controller: "AdminCtrl"
            });
    });