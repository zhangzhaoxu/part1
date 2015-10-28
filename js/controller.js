angular.module('App').controller('nutritionController', ['$http', '$q', '$timeout', '$scope','$mdDialog' ,function ($http, $q, $timeout, $scope,$mdDialog) {
    'use strict';

    $scope.selected = [];
    $scope.showEdit = true;

    $scope.deleteSelected = function (selects) {
        console.log(selects);
        selects.forEach(function (select) {
            $scope.desserts.data.splice($scope.desserts.data.indexOf(select),1);
            $scope.desserts.count--;
        });
        $scope.selected=[];
    };

    $scope.showConfirm = function(ev,selects) {    //删除确认
        var confirm = $mdDialog.confirm()
            .title('你确定要删除吗?')
            .content('删除后无法恢复哦！')
            .targetEvent(ev)
            .ok('删除')
            .cancel('取消');
        $mdDialog.show(confirm).then(function() {
            $scope.deleteSelected(selects); //删除
        }, function() {
            //取消删除
        });
    };

    $scope.Edit = function (dessert) {
        console.log(dessert);
        var index = $scope.desserts.data.indexOf(dessert);
        $scope.desserts.data[index].ReadOrWrite = !$scope.desserts.data[index].ReadOrWrite;
        $scope.showEdit = !$scope.showEdit;
        console.log($scope.showEdit);
    };

    $scope.Save = function (dessert) {
        console.log(dessert);
        //此处添加向后台修改的申请，成功推出编辑模式，失败提示
        var index = $scope.desserts.data.indexOf(dessert);
        $scope.desserts.data[index].ReadOrWrite = !$scope.desserts.data[index].ReadOrWrite;
        $scope.showEdit = !$scope.showEdit;
    }

    $scope.prevent = function (event) {
        event.stopPropagation();
    }

    $scope.query = {
        order: 'name',
        limit: 6,
        page: 1
    };

    $scope.columns = [{
        name: '姓名',
        orderBy:'name'
    }, {
        name: '性别',
        orderBy:'sex'
    }, {
        name: '学号',
        orderBy:'No'
    },  {
        name: '联系方式',
        orderBy:'Phone'
    }];

    $http.get('./data/desserts.json').then(function (desserts) {
        $scope.desserts = desserts.data;
    });

    $scope.getTypes = function () {
        return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };

    $scope.onpagechange = function(page, limit) {

        console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);

        var deferred = $q.defer();

        $timeout(function () {
            deferred.resolve();
        }, 1000);

        return deferred.promise;
    };

    $scope.loadStuff = function () {
        var deferred = $q.defer();

        $timeout(function () {
            deferred.reject();
        }, 1000);

        $scope.deferred = deferred.promise;
    };

    $scope.onorderchange = function(order) {

        console.log('Scope Order: ' + $scope.query.order);
        console.log('Order: ' + order);

        var deferred = $q.defer();

        $timeout(function () {
            deferred.resolve();
        }, 2000);

        return deferred.promise;
    };

}]);