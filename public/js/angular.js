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
})


app.controller('contactController', function($scope, $http) {
    $scope.sub = function($scope) {
    $http.post('/contact', $scope.formData).
    success(function(data) {
        console.log("posted success")
        }).
    error(function(data) {
        console.error("posted failed")
        })
    }}
)