(function () {

    var UserController = function ($scope, github, $routeParams, $location, $q) {

        var starCount = [];

        var starsCount = function (repos) {
            var addStargazers = function (stargazers) {
                for (var i in stargazers) {
                    if (stargazers[i] in starCount) {
                        starCount[stargazers[i]] += 1;
                    } else {
                        starCount[stargazers[i]] = 1;
                    }

                }
            };

            var updateStargazers = function (response) {
                var starCountJson = [];
                for (var name in starCount) {
                    starCountJson.push({
                        name: name,
                        starCount: starCount[name]
                    });
                }
                $scope.starCount = starCountJson;
            };

            var promises = [];
            for (var i in repos) {
                promises.push(github.getStargazers(repos[i]).then(addStargazers));
            }

            $q.all(promises).then(updateStargazers);
        };

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(starsCount);
        };

        var onError = function (reason) {
            if (reason.status === 403) {
                $location.path("/403");
            } else {
                $location.path("/404");
            }
        };

        $scope.noOfStargazers = 5;
        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(onUserComplete, onError);

    };

    angular.module("starFriend").controller("UserController", UserController);

} ());
