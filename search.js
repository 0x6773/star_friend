(function () {

    var SearchController = function ($scope, $location) {

        $scope.search = function (username) {
            $location.path("/star_of/" + username);
        };
    };

    angular.module("starFriend").controller("SearchController", SearchController);

} ());