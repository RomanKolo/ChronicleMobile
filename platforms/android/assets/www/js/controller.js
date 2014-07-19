angular.module('chronicleApp',['ngRoute', 'chronicleApp.services', 'chroniceApp.directives', 'chronicleApp.controllers'])
 .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/player.html',
		controller: 'chroniclePlayer'
	});
}]);

//A bit dirty, 
var chronicleDir = "Documents/Chronicle2";
var targetFile = "chronicle.json";
var dataVar;

/*angular.module('chronicleApp.directives', [])
	.directive('characterDirective', ['api', function(api)
	    {

			return function($scope,$element,$attrib) {
				$scope.data = function() {
					api.data
				}
			}
	    }]);*/

angular.module('chroniceApp.directives', [])
.directive('explodeTree', [function(){
	return {
		restrict: 'A',
		scope: {
			key: '@title',
			value: '@dodo',
			text: '@text'
		},
		link: function(scope, element, attr) {
			console.log("LOOKHERE! " + scope.key);
		},
		//templateUrl: 'template/tree_template.html'
	}
}])
.directive('playerInfo', [function(){
	return {
		restrict: 'E',
		templateUrl: 'template/directive/player_info.html'
	}
}]);

angular.module('chronicleApp.services', [])
.factory('characterData', ['$q', function (qi)
	{
	var deferred = qi.defer();


	
	return function(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
	
	
	setTimeout(function() {
		deferred.notify('Deferring');
		if (dataVar != null)
		{
			deferred.resolve(dataVar);
		}
	},1000)
	return deferred.promise;
	}
}]);

angular.module('chronicleApp.controllers', [])
//Player page function
function chroniclePlayer($scope, $http, $route, $q, characterData) {
	console.log("Always Show this line");
	
	var localVar;

	
	
	//document.addEventListener("deviceready", onDeviceReady, false);	
	
	var promise = characterData();
	promise.then(function(a) 
	{
		var data = JSON.parse(a);
		$scope.playerText = data.chronicleJSON.character;
	}
	, dataFail, dataNotify);
	//$scope.testData = localVar;
	
	$scope.testText = "NARF!";
	
    /*$http.get('json/testdata.json').success(function(data) {
    	if (data.chronicleJSON.character) {
    		$scope.playerText = data.chronicleJSON.character;	
    	}
    });*/
    
    $scope.greenButton = function() {
    	$route.reload();
    }
}



function dataFail(b)
{
	console.log('fail' + b);
}

function dataNotify(c)
{
	console.log('notify' + c);
}

function onDeviceReady() {
	console.log("ONDEVICEREADY");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail)
}

function gotFS(filesystem) {
	console.log("GOTFS");
	filesystem.root.getDirectory(chronicleDir, {create: true, exclusive: false}, gotDirectory, fail)
}

function gotDirectory(chronicleDirectory){
	chronicleDirectory.getFile(targetFile, {create: true}, gotFileEntry, fail)
}

function gotFileEntry(fileEntry) {
	//console.log(fileEntry.fullPath);
    fileEntry.file(gotFile, fail)
}

function gotFile(file) {
	readAsText(file);
}

function readAsText(file) {
	//console.log(file.fullPath);
	var reader = new FileReader();
	reader.onloadend = function(evt) {
       console.log("FILEREAD");
      // console.log(evt.target.result);
       setData(evt.target.result);
       //rte.reload();
   };	           
   reader.readAsText(file);
}

function setData(dataToSet) {
		dataVar = dataToSet;
}

function fail(evt){
	console.log(evt.target.error.code);
}