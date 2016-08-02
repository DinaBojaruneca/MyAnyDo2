var myAnyDoApp = angular.module("myAnyDoApp");

myAnyDoApp.controller('UploadCtrl', ['$scope', '$http', function ($scope, $http) {
    

    $scope.filesChanged = function(elm){
        $scope.files=elm.files
        $scope.$apply();
    }
    $scope.uploadFile = function(){
        var fd = new FormData()
        angular.forEach($scope.files, function(file){
            fd.append('file', file)
            fd.append('taskId', $scope.TaskId)
        })
        $http.post('/Home/SaveFiles', fd,{
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success(function(d){
            console.log(d)
        })
    }
}])

myAnyDoApp.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind('change', function () {
                $parse(attrs.fileInput)
                .assign(scope, elm[0].files)
                scope.$apply()
            })
        }
    }
    }]);


myAnyDoApp.controller('FileCtrl', function ($scope, $http) {
    getFile();

    function getFile() {
        $http.get('/Home/GetFile')
          .then(function (response) {
              $scope.files = response.data;
          });
    }

    $scope.Refresh = function () {
        getFile();
        $scope.Tviewe = 'attach';
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

