var chronicleApp = angular.module('chronicleApp', ['ngRoute', 'ui.bootstrap',]);

chronicleApp.factory('characterDataService', [ '$window', '$route', function(win,rte){
	var chronicleDir = "Documents/Chronicle2";
	var dataVar = "SAUSAGES!";
	
	function fail(e){
		console.log(e.code);
	};
	
	return{ 
		getFile: function(targetFile) {
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
				               rte.reload();
				           };	           
				           reader.readAsText(file);
				       }, fail)
				       }, fail)
				}, fail)
				}, fail)
			}, false);
			return dataVar;
		},
			
		testService: function(){
			return chronicleDir;
		}
		
	};
}]);


chronicleApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/player.html',
		controller: 'chroniclePlayer'
	});
}]);

/*
var chronicleControllers = angular.module('chronicleControllers', []);
var variable = "NADA";
*/
angular.module('myFilters', [])
.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  }
});

chronicleApp.controller('chroniclePlayer', ['$scope', '$http', 'characterDataService', chroniclePlayer]);
                                            
function chroniclePlayer($scope, $http, characterData) {
	console.log("Always Show this line");
	$scope.fileData = characterData.getFile("chronicle.json");

	
	
	
	$scope.testText = "Blue";
    const CHECKMARK_IMG = "img/30px-MW-Icon-CheckMark.png";
    const ERROR_IMG = "img/X32.png";
    $scope.statusImg = CHECKMARK_IMG;
    $scope.validImg = true;
    $scope.singleModel = 1;
	
  $http.get('json/testdata.json').success(function(data) {
    	if (data.chronicleJSON.character) {
    		$scope.testText = data.chronicleJSON.character;	
    	}
    });
    
   // $scope.testText = fileData;
    $scope.hidey = false;
    $scope.greenButton = function() {
    	$scope.hidey = true;
    };
	
    $scope.redButton = function() {
    	$scope.testText = "RED";
    };
    
	$scope.loadcharacter = function() {
		
		chrome.fileSystem.chooseEntry({type: 'openFile'}, function(path) {
			console.log(path);
			variable = "YELLOW2";
			if (path.isFile) {
				console.log("if");
				path.file(function(file){
					console.log("file read");
					var reader = new FileReader();
					reader.onloadstart = (function() {
						$scope.statusImg = ERROR_IMG;
						variable = "YELLOW";
					});
					reader.onerror = function(e) {
				    	conslole.log("ERROR");
				        console.log(e.target.error);
				    };
				    reader.onloadend = function(e) {
				    	variable = "BLUE2";
				    	console.log("onloadend");
				    	console.log("Start read");
						var chronicleCharacter = "NOTHING";
						try {
							chronicleCharacter = JSON.parse(e.target.result);	
						} catch (e) {
							console.error("Parsing error:", e);
							console.error(location);
						}
						
						console.log("2 read");
						console.log(chronicleCharacter);
						variable = "BLUE3";
				    };
				    reader.readAsText(file);
				    console.log(reader.result);
				    variable = "BLUE5";
				}, 
				function(error){
					console.log("POO!". error.code);
				});
		        console.log("start"); 
		        $scope.statusImg = CHECKMARK_IMG;
			    console.log("reader");
		      };	
		});
		$scope.testText = variable;
	};
	
};
//chroniclePlayer.$inject = ['$scope', '$http'];




function slowAlert() {
	 console.log("SLOW");
	$scope.statusImg = ERROR_IMG;
};

/*
chronicleApp.factory('characterData', function(sourceFile){
	
	
document.addEventListener("deviceready", function() {
			console.log("ONDEVICEREADY");
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function(filesystem) {
			console.log("GOTFS");
			fileSystem.root.getDirectory("Documents/Chronicle2", {create: true, exclusive: false}, function(chronicleDirectory){
				chronicleDirectory.getFile("chronicle.json", {create: true},  function gotFileEntry(fileEntry) {
			    	 console.log("GOTFILEENTRY");
			         fileEntry.file(function readAsText(file) {
			      	   console.log("READ");
			           var reader = new FileReader();
			           reader.onloadend = function(evt) {
			               console.log("Read as text");
			               return evt.target.result.chronicleJSON.character;
			           };
			           reader.readAsText(file);
			       }, fail);, fail)
			}, fail);
			}S, fail)
		};, false)
		};
		return readAsText;
	};;
}
})




function fileReadFUnction(file) {
		
		console.log("if3");
		reader.onload = (function(readerEntry){
			return function(e) {
				console.log("E=" . e);
				console.log("e.target = " . e.target);
				console.log("readerEntry = " . readerEntry);
				readJSON(e.tartget.result);
			};
		});
	    

		console.log("if3");
	    
	};

	function displayCharacter($string) {
		
		document.queryselector('display').value = string;
	};

	function readJSON(location) {
		
	};	








chronicleApp.controller('chronicleTest', function chronicleTest($scope) {
	
	$scope.test = [
	               {'key': 'value',
	            	   'key2': 'value2'
	               },
	               {'key': 'this is some text',
	            	   'key2': 'text as well'}
	               ];
});
	
*/
