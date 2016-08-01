var myAnyDoApp = angular.module("myAnyDoApp");

myAnyDoApp.controller("SubTaskCtrl", function ($scope, $http) {
    getSubTask();
    getNote();

    //read data from database  
    function getSubTask() {
        $http.get('/Home/GetSubTask')
        .then(function (response) {
            $scope.subtasks = response.data;
        });
    }
    function getNote() {
        $http.get('/Home/GetNote')
        .then(function (response) {
            $scope.notes = response.data;
        });
    }

    //change priority
    $scope.ChangePriority = function () {

        $http({
            method: 'POST',
            url: '/Home/SetHighPriority',
            data: { 'taskId': $scope.TaskId, 'hp': $scope.HighPriority }
        })
        .success(function () {
            getSubTask();
        });
    }


    $scope.Tviewe = "subTask";
    $scope.SetTviewe = function (value) {
        $scope.Tviewe = value;
    }

    //filter subtasks by task Id
    $scope.FilterSubTasks = function (subtask) {
        return subtask.TaskId == $scope.TaskId;
    }

    //filter notes by task Id
    $scope.FilterNotes = function (note) {
        return note.TaskId == $scope.TaskId;
    }

    //switching between Subtask viewes
    $scope.subtaskV = "subTaskData";
    $scope.SetSubtaskV = function (value) {
        $scope.subtaskV = value;
    }

    //switching between subtasks and notes
    $scope.Tviewe = "subTask";
    $scope.SetTviewe = function (value) {
        $scope.Tviewe = value;
    }

    //insert subtask
    $scope.InsertSubTask = function () {
        $http({
            method: 'POST',
            url: '/Home/InsertSubTask',
            data: { 'name': $scope.SubTaskName, 'taskId': $scope.TaskId },
            headers: { 'content-type': 'application/json' }
        })
            .success(function () {
                getSubTask();
            });
        $scope.subtaskV = "subTaskData";
        $scope.SubTaskName = "";
    }

    //delete Subtask
    $scope.DeleteSubtask = function (Id) {
        $http({
            method: 'POST',
            url: '/Home/DeleteSubTask',
            data: { id: Id },
            headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getSubTask();
        });
        $scope.subtaskV = "subTaskData";
    }

    //insert Note
    $scope.InsertNote = function () {
        $http({
            method: 'POST',
            url: '/Home/InsertNote',
            data: { 'name': $scope.NoteName, 'taskId': $scope.TaskId },
            headers: { 'content-type': 'application/json' }
        })
            .success(function () {
                getNote();
            });
        $scope.subtaskV = "subTaskData";
        $scope.NoteName = "";
    }

    //delete Note
    $scope.DeleteNote = function (Id) {
        $http({
            method: 'POST',
            url: '/Home/DeleteNote',
            data: { id: Id },
            headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getNote();
        });
        $scope.subtaskV = "subTaskData";
    }

    $scope.Show = false;
    $scope.SetVisible = function () {
        $scope.Show = true;
    }
    $scope.Hide = function () {
        $scope.Show = false;
    }

    $scope.dates = ["MM/DD/YY", "DD/MM/YY"];
    $scope.times = ["24 hour", "12 hour"];

    $scope.DFormat = "DD/MM/YY";

    $scope.TFormat = "24 hour";

});