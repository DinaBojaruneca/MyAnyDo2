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
            data: { name: $scope.CategoryName }
            //headers: { 'content-type': 'application/json' }
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
            //headers: { 'content-type': 'application/json' }
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

    $scope.SetTaskVValue = function ( value) {
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
            //headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getTask();
        });
        $scope.taskV = "taskData";
    };

});

//subtask controller
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
            data: { 'name': $scope.SubTaskName, 'taskId' : $scope.TaskId },
            //headers: { 'content-type': 'application/json' }
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
            //headers: { 'content-type': 'application/json' }
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
            //headers: { 'content-type': 'application/json' }
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
            //headers: { 'content-type': 'application/json' }
        })
        .success(function () {
            getNote();
        });
        $scope.subtaskV = "subTaskData";
    }

    

});

//FileUpload controller
myAnyDoApp.controller("UploadCtrl", function ($scope, fileUpload, $http) {
    $scope.uploadFile = function () {
        var file = $scope.myFile;

        console.log('file is ');
        console.dir(file);

        var uploadUrl = "/Home/SaveFiles";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.TaskId);

        //getFile();
        //$scope.subtaskV = "attach";
    };

    getFile();

    //read data from database  
    function getFile() {
        $http.get('/Home/GetFile')
        .then(function (response) {
            $scope.files = response.data;
        });
    }

    //filter files by task Id
    $scope.FilterFiles = function (file) {
        return file.TaskId == $scope.TaskId;
    }

    $scope.DeleteFile = function (index, id) {
        var file = $scope.files[index];
        if (file.isUploaded) {
            $http.delete('~/UploadedFiles' + file.id).then(function (response) {
                if (response.status == 200) {
                    $scope.files.splice(index, 1);
                }
            });
        } else {
            $scope.files.splice(index, 1);
        }

        $http({
            method: 'POST',
            url: '/Home/DeleteFile',
            data: { id: id }            
        })
        .success(function () {
            getFile();
        });
        $scope.subtaskV = "attach";
    }

});
   

myAnyDoApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myAnyDoApp.service('fileUpload', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl, taskId) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('taskId', taskId)

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })

        .success(function () {         
        })

        .error(function () {
        });
        
    }
});