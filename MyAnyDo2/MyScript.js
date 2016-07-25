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
    };

    //switching between forms
    $scope.mode = 'categ';
    $scope.SetModeValue = function (value) {
        $scope.mode = value;
    };

    //category paramiters
    //$scope.CatId;
    //$scope.CatName;
    $scope.SetCatAndMode = function (id, name, mode) {
        $scope.CatId = id;
        $scope.CatName = name;
        $scope.mode = mode;

        //$rootScope.$broadcast("catId", {
        //    CatId: $scope.CatId
        //});
    };

    //add category
    $scope.InsertCategory = function () {
        $http({
            method: 'POST',
            url: '/Home/InsertCategory',
            data: { name: $scope.CategoryName },
            //headers: { 'content-type': 'application/json' }
        })
            .success(function () {
                getCategory();
            });
        $scope.mode = "categ";        
        $scope.CategoryName = "";
    }

    //delete category
    $scope.DeleteCategory = function () {
        $http({
            method: 'POST',
            url: '/Home/DeleteCategory',
            data: { id: $scope.CatId },
            //headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getCategory();
        });
        $scope.mode = "categ";
    };

});

myAnyDoApp.factory('CategoryService', function($http){
    var CategoryService = {};
    CategoryService.getCategory = function(){
        return $http.get('/Home/GetCategory');
    }
    return CategoryService;
});



//Task controller
myAnyDoApp.controller("TaskCtrl", function ($scope, $http) {
    getTask();
    getTime();

    //read data from database  
    function getTask() {
        $http.get('/Home/GetTask')
        .then(function (response) {
            $scope.tasks = response.data;
        });
    }
    function getTime() {
        $http.get('/Home/GetTime')
        .then(function (response) {
            $scope.times = response.data;
        });
    }

    //switching between viewes
    $scope.viewe = "time";
    $scope.SetVieweValue = function (value) {
        $scope.viewe = value;
    }

    //$scope.$on("catId", function (event, args) {
    //    $scope.CatId = args.CatId;
    //});

    //filter by category Id
    $scope.FilterTasks = function (task) {
        return task.CategoryId == $scope.CatId;
    }

    $scope.TaskId;
    $scope.TaskName;
    $scope.TimeId;
    $scope.HighPriority;
    $scope.SubTaskName;
    $scope.Note;
    $scope.CreationDate;    

    $scope.SetTimePriorMode = function (timeId, Hp, Value) {
        $scope.TimeId = timeId;
        $scope.HighPriority = Hp;
        $scope.viewe = Value;
    }

    // insert Task to database
    $scope.InsertTask = function () {
        $http({
            method: 'POST',
            url: '/Home/InsertTask',
            data: { 'name': $scope.TaskName, 'catId': $scope.CatId, 'timeId': $scope.TimeId, 'hp': $scope.HighPriority },
            headers: { 'content-type': 'application/json' }
        })
            .success(function () {
                getTask();
            });
        $scope.mode = "taskView";
        $scope.TaskName = "";
    }

});