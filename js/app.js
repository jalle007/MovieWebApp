var movieApp = angular.module("movieApp", ['ui.router']);
var apiKey="63067b01211f792c969cfe39f96a03a9";
var baseURL = "https://api.themoviedb.org/3/movie/";

movieApp.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state("main", {
			url: "/main",
			templateUrl: "templates/main.html",
			controller: "movieCtrl"
		})
		.state("main.movies", {
			url: "/movies",
			templateUrl: "templates/movies.html",
		})
		.state("main.shows", {
			url: "/shows",
			templateUrl: "templates/shows.html"
		})
		.state('main.movieinfo', {
			url: "/movie/:id",
			templateUrl: "templates/movieinfo.html",
            controller: "movieItemCtrl"
		/*	controller: function($scope, $stateParams){
                $scope.movie =$scope.movies[$stateParams.movieId];
			}*/
	    })
		.state("main.showinfo", {
			url: "/showinfo/:id",
			templateUrl: "templates/showinfo.html",
		});
	$urlRouterProvider.otherwise("/main/movies");
});

movieApp.controller('movieCtrl', function($scope, $http) {
	//https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&language=en-US&page=1
	var url=baseURL +"popular?api_key=" + apiKey + "&language=en-US&page=1";
    $http.get(url).then(function(response) {
        $scope.movies = response.data.results;
        console.log( "movies: ",  $scope.movies);
    });
});

movieApp.controller('movieItemCtrl', function($scope, $http, $stateParams) {
    console.log( "id: ",  $stateParams);
//    https://api.themoviedb.org/3/movie/550?api_key=63067b01211f792c969cfe39f96a03a9

    var url=baseURL + $stateParams.id +"?api_key=" + apiKey ;
    console.log("url: ", url);



    $http.get(url).then(function(response) {
        $scope.movie = response.data;
        console.log( "movie: ",  $scope.movie);
    });

 /*   https://api.themoviedb.org/3/movie/550?api_key=63067b01211f792c969cfe39f96a03a9
        $http.get("db/movies.php").then(function(response) {
        $scope.movies = response.data.records;
        $scope.movie =$scope.movies[$stateParams.movieId];
        console.log( "movie: ", $scope.movies);*/
});


movieApp.controller('showsCtrl', function($scope, $http){
	$http.get("db/shows.php").then(function(response){
		$scope.shows = response.data.records;
	});
});

/*
 movieApp.controller('movieCtrl', function($scope, $http) {
 $http.get("db/movies.php").then(function(response) {
 $scope.movies = response.data.records;

 console.log( "movie: ", $scope.movies);
 });
 });
movieApp.controller('movieItemCtrl', function($scope, $http, $stateParams) {
    $http.get("db/movies.php").then(function(response) {
        $scope.movies = response.data.records;
        $scope.movie =$scope.movies[$stateParams.movieId];
        console.log( "movie: ", $scope.movies);
    });
});


movieApp.controller('showsCtrl', function($scope, $http){
    $http.get("db/shows.php").then(function(response){
        $scope.shows = response.data.records;
    });
});

*/



