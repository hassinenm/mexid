// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var mexidApp = angular.module('mexidApp', ['ngRoute']);

// configure our routes
mexidApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/mexicanid.html',
            controller  : 'mainController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
        
});

// create the controller and inject Angular's $scope
mexidApp.controller('mainController', function($scope, $http) {
    // create a message to display in our view
    $http.get('/api/mexicans')
        .success(function(data) {
            $scope.mexicans = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.message = 'Create your own Mexican ID!';
    // GO! button clicked, generating mexican ID
    $scope.goClick = function() {
        alert($scope.nameInput);
        $http.post('api/mexicans', { name : $scope.nameInput })
            .success(function(data, status, headers, config) {
                alert(data);
            // this callback will be called asynchronously
            // when the response is available
        })
            .error(function(data, status, headers, config) {
                alert(data);
                console.log('Error: ' + data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
    
    
});

mexidApp.controller('contactController', function($scope) {
    $scope.message = 'You can also contact me!';
});

mexidApp.directive("idcard", function(){
return {
    restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');
            ctx.lineWidth = 80;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(-20, 120);
            ctx.bezierCurveTo(300, -40, 370, 80, 500, -20);
            ctx.stroke();

            ctx.lineWidth = 7;
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(-10, 67);
            ctx.bezierCurveTo(400, -10, 360, 105, 500, 18);
            ctx.stroke();

            ctx.lineWidth = 70;
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(-20, 30);
            ctx.bezierCurveTo(400, -50, 370, 80, 500, -30);
            ctx.stroke();
            
            ctx.font = "35px Calibri";
            ctx.fillStyle = 'white';
            ctx.fillText("MEXICO", 70, 30);
            
            ctx.font = "15px Calibri";
            ctx.fillStyle = 'white';
            ctx.fillText("MATRICULA CONSULAR", 200, 20);
            
            ctx.font = "12px Calibri";
            ctx.fillStyle = 'white';
            ctx.fillText("CONSULAR ID CARD", 350, 20);
            
            ctx.font = "9px Calibri";
            ctx.fillStyle = 'black';
            ctx.fillText("Nombre/Name", 200, 80);
            ctx.fillText("Lugar y Fecha de Nacimiento/Place of Birth and Birth Date", 200, 125);
            ctx.fillText("Dirección/Address", 200, 170);
            ctx.fillText("Fecha de Emissión/Date of Issue", 200, 215);
            ctx.fillText("Fecha de Expiración/Date of Expiry", 325, 215);
            ctx.fillText("Authoridad/Authority", 200, 260);
            ctx.fillText("N° Documento/ID Number", 325, 260);
            
                        
            ctx.font = "Bold 12px Calibri";
            ctx.fillStyle = 'black';
            ctx.fillText("MARKKU", 202, 95);
            ctx.fillText("HASSINEN", 202, 110);
            ctx.fillText("OAXACA", 202, 140);
            ctx.fillText("01 DIC 1955", 202, 155);
            ctx.fillText("OAXACA", 202, 185);
            ctx.fillText("01 DIC 1955", 202, 200);
            
            var img = document.createElement("img");
            img.src = "http://izkali.ysosdev.com/files/2011/08/Product-of-mexico-watermark_op40.png";
            ctx.drawImage(img,250,80, 200, 200);
            
            var img = document.createElement("img");
            img.src = "http://s11.postimg.org/4xzowsg8z/estados_unidos.png";
            ctx.drawImage(img,3,1, 55, 55);
            
            var img = document.createElement("img");
            img.src = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtp1/v/t1.0-1/c244.2.716.716/s320x320/10177890_10152582171437660_2291415937533671490_n.jpg?oh=75f954a5d005a14688af85d9c50026ad&oe=55D3D237&__gda__=1440171177_20fd24f3e3a2f495dde756ce99313ff2";
            ctx.drawImage(img,20,80, 150, 200);
            
       }
    };
});


var UploadController = function ($scope, fileReader) {

    console.log(fileReader);
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
        });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });
 
};

mexidApp.directive("ngFileSelect",function(){

    return {
        link: function($scope,element){
            element.bind("change", function(e){
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
                var canvas = document.getElementById("output");
                var ctx = canvas.getContext('2d');
                var img = document.createElement("img");
                img.src = $scope.imageSrc;
                ctx.drawImage(img,3,1, 55, 55);        
            });     
        } 
    }; 
});

(function (module) {
     
    var fileReader = function ($q, $log) {
 
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
    };
 
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);
 
}(angular.module("mexidApp")));





/*

	var image = new Image();
	var canvas = document.getElementById("output");
	var ctx = canvas.getContext("2d");
	image.onload = function () {
		// load image, and draw it to canvas 
		document.getElementById("load-time").innerHTML = Math.round((new Date()).getTime() - elapsed_time).toString() + "ms";
		document.getElementById("detection-time").innerHTML = "Measuring ...";
		var dim = getImageDim(image);
		document.getElementById("image-dim").innerHTML = dim.width.toString() + "x" + dim.height.toString();
		var boundingWidth = document.getElementById("content").offsetWidth - 4;
		var boundingHeight = window.innerHeight - (document.getElementById("header").offsetHeight + document.getElementById("footer").offsetHeight + document.getElementById("urlbox").offsetHeight + document.getElementById("stats").offsetHeight) - 120;
		var viewport = document.getElementById("viewport");
		var newWidth = dim.width, newHeight = dim.height, scale = 1;
		if (dim.width * boundingHeight > boundingWidth * dim.height) {
			newWidth = boundingWidth;
			newHeight = boundingWidth * dim.height / dim.width;
			scale = newWidth / dim.width;
		} else {
			newHeight = boundingHeight;
			newWidth = boundingHeight * dim.width / dim.height;
			scale = newHeight / dim.height;
		}
		viewport.style.width = newWidth.toString() + "px";
		viewport.style.height = newHeight.toString() + "px";
		canvas.width = newWidth;
		canvas.style.width = newWidth.toString() + "px";
		canvas.height = newHeight;
		canvas.style.height = newHeight.toString() + "px";
		ctx.drawImage(image, 0, 0, newWidth, newHeight);
		elapsed_time = (new Date()).getTime();
		function post(comp) {
			document.getElementById("num-faces").innerHTML = comp.length.toString();
			document.getElementById("detection-time").innerHTML = Math.round((new Date()).getTime() - elapsed_time).toString() + "ms";
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(230,87,0,0.8)';
			// draw detected area 
			for (var i = 0; i < comp.length; i++) {
				ctx.beginPath();
				ctx.arc((comp[i].x + comp[i].width * 0.5) * scale, (comp[i].y + comp[i].height * 0.5) * scale,
						(comp[i].width + comp[i].height) * 0.25 * scale * 1.2, 0, Math.PI * 2);
				ctx.stroke();
			}
		}
		// call main detect_objects function
		if (async) {
			ccv.detect_objects({ "canvas" : ccv.grayscale(ccv.pre(image)),
								 "cascade" : cascade,
								 "interval" : 5,
								 "min_neighbors" : 1,
								 "async" : true,
								 "worker" : 1 })(post);
		} else {
			var comp = ccv.detect_objects({ "canvas" : ccv.grayscale(ccv.pre(image)),
											"cascade" : cascade,
											"interval" : 5,
											"min_neighbors" : 1 });
			post(comp);
		}
	};
	image.src = src;

}
*/

