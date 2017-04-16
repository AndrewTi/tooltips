angular.module("GlobalCtrl", [])
    .controller("GlobalCtrl", ($scope, TooltipPos, Menu, ManipulationData) => {

        const id = data => document.getElementById(data);


        ManipulationData.loadData().then(data => {
            $scope.tooltips = data.data;

            console.log($scope.tooltips);
        });

        $scope.$on("add", (event, data) => {
            $scope.tooltips.push(data);
        });

        $scope.$on("remove", (event, id) =>{
            let arr = [];
            $scope.tooltips.forEach((el, index) => {
                if(el._id != id){
                    arr.push(el);
                }
            });

            $scope.tooltips = arr;
        });

        $scope.$on("edit", (event, data) => {
            let arr = [];
            $scope.tooltips.forEach((el, index) => {
                if(el._id == data._id){
                    el = data;
                }
                arr.push(el);
            });
            $scope.tooltips = arr;
        });

        window.addEventListener("scroll", () => {
            TooltipPos.resetCoord(id("tooltip"))
        });
        window.addEventListener("touchstart", () => {
            TooltipPos.resetCoord(id("tooltip"))
        });

        $scope.tooltipShow = (elem, el) => {
            TooltipPos.setCoord(id("tooltip"), elem.currentTarget);
            TooltipPos.setData({head: id("tooltip-head"), text: id("tooltip-text")},el);
        };

        $scope.tooltipHide = () => {
            TooltipPos.resetCoord(id("tooltip"));
        };

        $scope.showMenu = () => {
            Menu.showMenu();
        };

        $scope.hideMenu = () => {
            Menu.hideMenu();
        };
    });