angular.module('chronicleApp', ['ngRoute', 'ui.bootstrap','chronicleApp.directives']);
angular.module('chronicleApp.directives', [])
.directive('characterDirective', ['character', function(character)
    {
	document.addEventListener("deviceready", function() {
		console.log("ONDEVICEREADY");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function(filesystem) {
		console.log("GOTFS");
		filesystem.root.getDirectory(chronicleDir, {create: true, exclusive: false}, function(chronicleDirectory){
			chronicleDirectory.getFile(targetFile, {create: true},  function gotFileEntry(fileEntry) {
		    	 console.log(fileEntry.fullPath);
		         fileEntry.file(function readAsText(file) {
		      	   console.log(file.fullPath);
		           var reader = new FileReader();
		           reader.onloadend = function(evt) {
		               console.log("FILEREAD");
		               console.log(evt.target.result);
		               dataVar = evt.target.result;
		               //rte.reload();
		           };	           
		           reader.readAsText(file);
		       }, fail)
		       }, fail)
		}, fail)
		}, fail)
	}, false);
	$scope.testData = dataVar;
},
		return function($scope,$element,$attrs) {
			
		}
	}]);

chronicleApp.factory('characterDataService', function ($rootScope, $q,$timeout) {
	/*var chronicleDir = "Documents/Chronicle2";
	var targetFile = "chronicle.json";
	var dataVar = "SAUSAGES!";*/
	
	this.get = function() {
	      var deferred = $q.defer();
	  
	      setTimeout(function() { 
	    	  $rootScope.$apply(function() {
	      
	        deferred.resolve(['Hello3', 'world']);
	      })}, 2000);
	  
	      return deferred.promise;
	};
});
//All configs to ChronicleApp go here

chronicleApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/player.html',
		controller: 'chroniclePlayer'
	});
}]);

//Factory Definitions

//Controller Definitons
chronicleApp.controller('chroniclePlayer', ['$scope', '$http', 'characterDataService', chroniclePlayer]);

//Controller Functions

//Player page function
function chroniclePlayer($scope, $http, characterData) {
	console.log("Always Show this line");
	
	$scope.testText = characterData.get();
	
    $http.get('json/testdata.json').success(function(data) {
    	if (data.chronicleJSON.character) {
    		$scope.playerText = data.chronicleJSON.character;	
    	}
    });
}
