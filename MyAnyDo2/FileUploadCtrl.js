var myAnyDoApp = angular.module("myAnyDoApp");

myAnyDoApp.controller("UploadCtrl", function ($scope, fileUpload, $http) {

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        var uploadUrl = "/Home/SaveFiles";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.TaskId);   
    }

    getFile();

    $scope.Refrash = function () {
        getFile();
        $scope.Tviewe = 'attach';
    }

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