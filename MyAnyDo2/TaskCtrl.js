var myAnyDoApp = angular.module("myAnyDoApp");

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
    };

    //filter by category Id
    $scope.FilterTasks = function (task) {
        return task.CategoryId == $scope.CatId;
    };


    $scope.SetTimePriorMode = function (timeId, Hp, Value) {
        $scope.TimeId = timeId;
        $scope.HighPriority = Hp;
        $scope.taskV = Value;
    }

    //switching between task viewes
    $scope.taskV = "taskData";

    $scope.SetTaskVValue = function (value) {
        $scope.mode.value = "taskView";
        $scope.taskV = value;
        getTask();
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
        $scope.taskV = "taskData";
        $scope.TaskName = "";
    }

    $scope.HighPriority;
    $scope.TaskId;
    $scope.SetTaskAndTaskV = function (id, name, tVal, hp, crDate) {
        $scope.TaskId = id;
        $scope.TaskName = name;
        $scope.taskV = tVal;
        $scope.HighPriority = hp;
        $scope.CreationDate = crDate;
    }

    //delete Task
    $scope.DeleteTask = function () {
        $http({
            method: 'POST',
            url: '/Home/DeleteTask',
            data: { id: $scope.TaskId },
            headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getTask();
        });
        $scope.taskV = "taskData";
    };

});
