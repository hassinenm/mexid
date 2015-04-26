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
    $scope.message = 'Create your own Mexican ID!';
    
    $http.get('/api/mexicans')
        .success(function(data) {
            $scope.mexicans = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    // GO! button clicked, generating mexican ID
    $scope.goClick = function() {
        alert($scope.nameInput);
        $http.post('api/mexicans', { name : $scope.nameInput })
            .success(function(data, status, headers, config) {
                $scope.forename = data.forename;
                $scope.lastname = data.lastname;
            // this callback will be called asynchronously
            // when the response is available
        })
            .error(function(data, status, headers, config) {
                alert('Error: ' + data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
    
    
});

mexidApp.controller('contactController', function($scope) {
    $scope.message = 'You can also contact me: mh@live.fi ';
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
            
            ctx.save();
            ctx.translate(100,300);
            ctx.rotate(-0.25*Math.PI);
            ctx.font = "50px Calibri";
            ctx.fillStyle = 'red';
            ctx.fillText("FALSO", 150, 100);
            ctx.restore();
            
            alert(scope.lastname);
            
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
