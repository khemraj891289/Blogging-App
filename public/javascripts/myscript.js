var mainapp= angular.module("mainapp", ['ngRoute']);

mainapp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/viewhome', {
      templateUrl: 'viewhome.htm', controller: 'viewhomeController'
   }).

   when('/viewaboutus', {
      templateUrl: 'viewaboutus.htm', controller: 'viewaboutusController'
   }).

   when('/viewaboutcivilservices', {
      templateUrl: 'viewaboutcivilservices.htm', controller: 'viewaboutcivilservicesController'
   }).

   when('/viewcoursemodules', {
      templateUrl: 'viewcoursemodules.htm', controller: 'viewcoursemodulesController'
   }).

   when('/viewsyllabus', {
      templateUrl: 'viewsyllabus.htm', controller: 'viewsyllabusController'
   }).

   when('/viewsampleclasses', {
      templateUrl: 'viewsampleclasses.htm', controller: 'viewsampleclassesController'
   }).

   when('/viewgallery', {
      templateUrl: 'viewgallery.htm', controller: 'viewgalleryController'
   }).

   when('/viewcontactus', {
      templateUrl: 'viewcontactus.htm', controller: 'viewcontactusController'
   }).
   
   otherwise({
      redirectTo: '/viewhome'
   });
	
}]);