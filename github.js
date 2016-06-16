(function () {

    var github = function ($http, $q) {

        var getUser = function (username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepos = function (user) {

            var repoCount = user.public_repos;
            var page = 1;
            var repos = [];
            var promises = [];

            var addToRepos = function (response) {
                repos.push(response.data);
            };

            while (repoCount > 0) {
                var parameter = {
                    params: { page: page }
                };
                promises.push($http.get(user.repos_url, parameter).then(addToRepos));
                page += 1;
                repoCount -= 30;
            }
            return $q.all(promises)
                .then(function (response) {
                    return [].concat.apply([], repos);
                });
        };

        var getStargazers = function (repo) {
            var stars_count = repo.stargazers_count;
            var stargazers = [];
            var page = 1;
            var promises = [];

            var addStargazer = function (response) {
                for (var i in response.data) {
                    stargazers.push(response.data[i].login);
                }
            };

            while (stars_count > 0) {

                var parameter = {
                    params: {
                        page: page,
                        per_page: 100
                    }
                };

                promises.push($http.get(repo.stargazers_url, parameter).then(addStargazer));
                page += 1;
                stars_count -= 100;
            }
            return $q.all(promises)
                .then(function (response) {
                    return stargazers;
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos,
            getStargazers: getStargazers
        };
    };


    angular.module("starFriend").factory("github", github);
} ());