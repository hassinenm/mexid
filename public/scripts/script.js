// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
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
scotchApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Create your own Mexican ID!';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'You can also contact me!';
});

scotchApp.directive("idcard", function(){
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
