var myAnyDoApp = angular.module("myAnyDoApp");

myAnyDoApp.controller("EmailCtrl", function ($scope, $http) {

    $scope.Email;
    $scope.Description;

    $scope.SendEmail = function () {
        $http({
            method: 'POST',
            url: '/Home/SendEmail',
            data: { 'email': $scope.Email, 'description': $scope.Description, 'taskName': $scope.TaskName }           
        })
        .success(function () {
        });
        $scope.Email = '';
        $scope.Description = '';
    }
});