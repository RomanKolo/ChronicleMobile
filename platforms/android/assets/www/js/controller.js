var chronicleApp = angular.module('chronicleApp', ['ngRoute', 'chronicleControllers', 'ui.bootstrap']);



chronicleApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/player.html',
		controller: 'chroniclePlayer'
	});
}]);

var chronicleControllers = angular.module('chronicleControllers', []);
var variable = "NADA";

angular.module('myFilters', [])
.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  }
});

chronicleControllers.controller('chroniclePlayer', ['$scope', '$http', function($scope, $http) {
	console.log("Always Show this line");
	var _fileData;
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("json/testdata.json", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
    }
	
        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as text");
                console.log(evt.target.result);
            };
            reader.readAsText(file);
        }    
        
	$scope.fileData = _fileData;
	
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
	
}]);
chronicleControllers.$inject = ['$scope', '$http'];


function slowAlert() {
	 console.log("SLOW");
	$scope.statusImg = ERROR_IMG;
};

/*


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
