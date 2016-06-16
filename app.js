(function () {
    var app = angular.module("starFriend", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "search.html",
                controller: "SearchController"
            })
            .when("/star_of/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/404", {
                templateUrl: "404.html"
            })
            .when("/403",{
                templateUrl: "403.html"
            })
            .otherwise({ redirectTo: "/main" });
    });
} ());