var myAnyDoApp = angular.module("myAnyDoApp", []);

myAnyDoApp.controller("categoryCtrl", function ($scope, CategoryService) {
    getCategory();

    //read data from database
    function getCategory() {
       // $http.get("/Home/GetCategory")
       //.then(function (response) {
       //    $scope.categories = response;
       //});
        CategoryService.getCategory()
        .then(function (categ) {
            $scope.categories = categ.data;
        //    console.log($scope.categories);
        }, function () {
            alert('Faild');
        });
    }

});

myAnyDoApp.factory('CategoryService', function($http){
    var CategoryService = {};
    CategoryService.getCategory = function(){
        return $http.get('/Home/GetCategory');
    }
    return CategoryService;
});