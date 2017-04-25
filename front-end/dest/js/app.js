"use strict";

angular.module("ManipulationData", []).factory("ManipulationData", function ($http) {
    var baseURL = "http://localhost:3011/api/";

    var loadData = function loadData() {
        return $http.get(baseURL + "get").then(function (data) {
            return data;
        });
    };

    return {
        loadData: loadData
    };
});

angular.module("Tooltip", []).factory("TooltipPos", function () {
    var setCoord = function setCoord(toolt, elem) {
        var bottom = elem.getBoundingClientRect().bottom;
        var left = elem.getBoundingClientRect().left;
        var width = tooltip.getBoundingClientRect().right - tooltip.getBoundingClientRect().left;

        toolt.style.top = bottom + "px";
        toolt.style.left = left + "px";
        toolt.style.display = "block";
    };

    var resetCoord = function resetCoord(toolt) {
        toolt.style.display = "none";
    };

    var setData = function setData(toolt, data) {
        toolt.head.textContent = data.select.head;
        toolt.text.textContent = data.select.text;
    };

    return {
        setData: setData,
        setCoord: setCoord,
        resetCoord: resetCoord
    };
});

angular.module("Menu", []).factory("Menu", function () {
    var id = function id(data) {
        return document.getElementById(data);
    };
    var menu = id("menu");
    var menuContent = id("menu-content");

    var showMenu = function showMenu() {
        menu.classList.remove("hideMenu");
        setTimeout(function () {
            menu.classList.add("showMenu");
        });

        menuContent.classList.remove("hideContent");
        setTimeout(function () {
            menuContent.classList.add("showContent");
        });
    };

    var hideMenu = function hideMenu() {
        menu.classList.remove("showMenu");
        menu.classList.add("hideMenu");

        menuContent.classList.remove("showContent");
        menuContent.classList.add("hideContent");
    };

    return {
        showMenu: showMenu,
        hideMenu: hideMenu
    };
});

angular.module("Admin", []).factory("Admin", function ($http) {
    var baseUrl = "http://localhost:3011/api/";

    var add = function add(data) {
        var query = {
            textToolt: data.textToolt,
            select: data.select,
            img: data.img
        };

        return $http.post(baseUrl + "add", JSON.stringify(query));
    };

    var edit = function edit(data) {
        var query = {
            id: data._id,
            textToolt: data.textToolt,
            select: data.select,
            img: data.img
        };

        return $http.post(baseUrl + "edit", JSON.stringify(query));
    };

    var remove = function remove(id) {
        var query = { id: id };

        return $http.post(baseUrl + "remove", JSON.stringify(query));
    };

    return {
        add: add,
        edit: edit,
        remove: remove
    };
});

angular.module("TooltipApp.service", ["Tooltip", "Menu", "ManipulationData", "Admin"]);
angular.module("GlobalCtrl", []).controller("GlobalCtrl", function ($scope, TooltipPos, Menu, ManipulationData) {

    var id = function id(data) {
        return document.getElementById(data);
    };

    ManipulationData.loadData().then(function (data) {
        $scope.tooltips = data.data;

        console.log($scope.tooltips);
    });

    $scope.$on("add", function (event, data) {
        $scope.tooltips.push(data);
    });

    $scope.$on("remove", function (event, id) {
        var arr = [];
        $scope.tooltips.forEach(function (el) {
            if (el._id != id) {
                arr.push(el);
            }
        });

        $scope.tooltips = arr;
    });

    $scope.$on("edit", function (event, data) {
        var arr = [];
        $scope.tooltips.forEach(function (el) {
            if (el._id == data._id) {
                el = data;
            }
            arr.push(el);
        });
        $scope.tooltips = arr;
    });

    window.addEventListener("scroll", function () {
        TooltipPos.resetCoord(id("tooltip"));
    });
    window.addEventListener("touchstart", function () {
        TooltipPos.resetCoord(id("tooltip"));
    });

    $scope.tooltipShow = function (elem, el) {
        TooltipPos.setCoord(id("tooltip"), elem.currentTarget);
        TooltipPos.setData({ head: id("tooltip-head"), text: id("tooltip-text") }, el);
    };

    $scope.tooltipHide = function () {
        TooltipPos.resetCoord(id("tooltip"));
    };

    $scope.showMenu = function () {
        Menu.showMenu();
    };

    $scope.hideMenu = function () {
        Menu.hideMenu();
    };
});

angular.module("AdminCtrl", []).controller("AdminCtrl", function ($scope, Admin) {

    document.getElementById("img").addEventListener("change", function (ev) {
        var el = ev.target,
            file = new FileReader();

        file.addEventListener("load", function () {
            $scope.data.add.img = file.result;
            $scope.$apply();
        });

        file.readAsDataURL(el.files[0]);
    });

    document.getElementById("img-edit").addEventListener("change", function (ev) {
        var el = ev.target,
            file = new FileReader();

        file.addEventListener("load", function () {
            $scope.data.edit.img = file.result;
            $scope.$apply();
        });

        file.readAsDataURL(el.files[0]);
    });

    $scope.data = {
        add: {
            select: {},
            textToolt: [{ text: "", head: "" }],
            img: ""
        },

        edit: {
            id: "",
            select: {},
            textToolt: [],
            img: ""
        }
    };

    $scope.addNewText = function () {
        $scope.data.add.textToolt.push({ text: "", head: "" });
    };

    $scope.rmText = function (index) {
        var arr = void 0;
        $scope.data.add.textToolt.forEach(function (e, i) {
            if (i != index) {
                arr.push(e);
            }
        });

        $scope.data.add.textToolt = arr;
    };

    $scope.editAddNewText = function () {
        $scope.data.edit.textToolt.push({ text: "", head: "" });
    };

    $scope.editRmText = function (index) {
        var arr = [];

        $scope.data.edit.textToolt.forEach(function (e, i) {
            if (i != index) {
                arr.push(e);
            }
        });

        $scope.data.edit.textToolt = arr;
    };

    $scope.selectTextToolt = function (data) {
        $scope.data.add.select = data;
    };

    $scope.editSelectTextToolt = function (data) {
        $scope.data.edit.select = data;
    };

    $scope.removeTooltText = function (idx) {
        var arr = [];
        console.log($scope.data.add.textToolt);

        $scope.data.add.textToolt.forEach(function (el, index) {
            if (idx != index) {
                arr.push(el);
            }
        });

        $scope.data.add.textToolt = arr;
    };

    $scope.editRemoveTooltText = function (idx) {
        var arr = [];
        console.log($scope.data.edit.textToolt);

        $scope.data.edit.textToolt.forEach(function (el, index) {
            if (idx != index) {
                arr.push(el);
            }
        });

        $scope.data.edit.textToolt = arr;
    };

    $scope.edit = {
        status: false,
        show: function show(bool, edit) {
            $scope.edit.status = bool;
            if (!bool) return false;
            $scope.data.edit = {
                _id: edit._id,
                select: edit.select,
                textToolt: edit.textToolt,
                img: edit.img
            };
        }
    };

    $scope.add = function () {
        Admin.add($scope.data.add).then(function (res) {
            $scope.$emit("add", res.data);
        });
    };

    $scope.editSet = function () {
        Admin.edit($scope.data.edit).then(function (res) {
            $scope.$emit("edit", $scope.data.edit);
        });
    };

    $scope.remove = function (id) {
        Admin.remove(id).then(function (res) {
            $scope.$emit("remove", id);
        });
    };
});

angular.module("TooltipApp.Ctrl", ["GlobalCtrl", "AdminCtrl"]);

angular.module("TooltipsApp", ["TooltipApp.Ctrl", "TooltipApp.service", "ngRoute"]).config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

    $routeProvider.when("/", {
        templateUrl: "view/home/home.html"
    }).when("/admin", {
        templateUrl: "view/admin/admin.html",
        controller: "AdminCtrl"
    });
});