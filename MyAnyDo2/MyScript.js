var myAnyDoApp = angular.module("myAnyDoApp", []);



myAnyDoApp.controller("categoryCtrl", function ($scope, $http, CategoryService) {
    getCategory();

    //read data from database
    function getCategory() {        
        CategoryService.getCategory()
        .then(function (categ) {
            $scope.categories = categ.data;            
        }, function () {
            alert('Faild');
        });
    }

    //switching between forms
    $scope.mode = {value:'categ'};
    $scope.SetModeValue = function (value) {
        $scope.mode.value = value;
    };

    //category paramiters   
    $scope.SetCatAndMode = function (id, name, mode) {
        $scope.CatId = id;
        $scope.CatName = name;
        $scope.mode.value = mode;

    };

    //add category
    $scope.InsertCategory = function () {
        $http({
            method: 'POST',
            url: '/Home/InsertCategory',
            data: { name: $scope.CategoryName },
            headers: { 'content-type': 'application/json' }
        })
            .success(function () {
                getCategory();
            });
        $scope.mode.value = "categ";
        $scope.CategoryName = "";
    };

    //delete category
    $scope.DeleteCategory = function () {
        $http({
            method: 'POST',
            url: '/Home/DeleteCategory',
            data: { id: $scope.CatId },
            headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getCategory();
        });
        $scope.mode.value = "categ";
    };

});

myAnyDoApp.factory('CategoryService', function($http){
    var CategoryService = {};
    CategoryService.getCategory = function () {
        return $http.get('/Home/GetCategory');
    };
    return CategoryService;
});

