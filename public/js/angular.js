"use strict";
var app = angular.module("app", ['ngRoute'])

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: "/ang-views/home.html",
        controller: "homeController"
    }).when('/contact', {
        templateUrl: "/ang-views/contact.html",
        controller: "contactController"
    }).otherwise({
        redirectTo: '/'
    });
});


app.controller('contactController', function($scope, $http) {
   $scope.submit = function(){
       var data = {
           name: $scope.name,
           email: $scope.email,
           mobile:$scope.mobile,
           subject:$scope.subject,
           message:$scope.message
       };
    $http.post('/contact/', data).success(function(response) {
        console.log("Success");
    }, function(response) {
        console.log("Something went wrong");
    });
   };
    // $http({
    //       method  : 'POST',
    //       url     : '/contact',
    //       data    : $scope.formData,
    //       headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    //      }).success(function(data) {
    //         if (data.errors) {
    //           // Showing errors.
    //           $scope.errorName = data.errors.name;
    //           $scope.errorUserName = data.errors.username;
    //           $scope.errorEmail = data.errors.email;
    //         } else {
    //           $scope.message = data.message;
    //         }
    // }
// );
});
