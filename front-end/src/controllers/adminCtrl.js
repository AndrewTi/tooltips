angular.module("AdminCtrl", [])
    .controller("AdminCtrl", ($scope, Admin) => {

        document.getElementById("img").addEventListener("change", (ev) => {
            let el = ev.target, file = new FileReader();

            file.addEventListener("load", () => {
                $scope.data.add.img = file.result;
                $scope.$apply();
            });

            file.readAsDataURL(el.files[0]);

        });

        document.getElementById("img-edit").addEventListener("change", (ev) => {
            let el = ev.target, file = new FileReader();

            file.addEventListener("load", () => {
                $scope.data.edit.img = file.result;
                $scope.$apply();
            });

            file.readAsDataURL(el.files[0]);

        });

        $scope.data = {
            add: {
                select: {},
                textToolt: [{text: "", head: ""}],
                img: ""
            },

            edit: {
                id: "",
                select: {},
                textToolt: [],
                img: ""
            }
        };

        $scope.addNewText = () => {
            $scope.data.add.textToolt.push({text: "", head: ""});
        };

        $scope.rmText = (index) => {
            let arr;
            $scope.data.add.textToolt.forEach((e, i) => {
                if(i != index) {
                    arr.push(e);
                }
            });

            $scope.data.add.textToolt = arr;
        };

        $scope.editAddNewText = () => {
            $scope.data.edit.textToolt.push({text: "", head: ""});
        };

        $scope.editRmText = (index) => {
            let arr = [];

            $scope.data.edit.textToolt.forEach((e, i) => {
                if(i != index) {
                    arr.push(e);
                }
            });

            $scope.data.edit.textToolt = arr;
        };

        $scope.selectTextToolt = (data) => {
            $scope.data.add.select = data;
        };

        $scope.editSelectTextToolt = (data) => {
            $scope.data.edit.select = data;
        };

        $scope.removeTooltText = (idx) => {
            let arr = [];
            console.log($scope.data.add.textToolt);

            $scope.data.add.textToolt.forEach((el, index) => {
                if(idx != index){
                    arr.push(el);
                }
            });

            $scope.data.add.textToolt = arr;
        };

        $scope.editRemoveTooltText = (idx) => {
            let arr = [];
            console.log($scope.data.edit.textToolt);

            $scope.data.edit.textToolt.forEach((el, index) => {
                if(idx != index){
                    arr.push(el);
                }
            });

            $scope.data.edit.textToolt = arr;
        };

        $scope.edit = {
            status: false,
            show: (bool, edit) => {
                $scope.edit.status = bool;
                if(!bool) return false;
                $scope.data.edit = {
                    _id: edit._id,
                    select: edit.select,
                    textToolt: edit.textToolt,
                    img: edit.img
                };
            }
        };

        $scope.add = () => {
            Admin.add($scope.data.add)
                .then(res => {
                    $scope.$emit("add", res.data);
                })
        };

        $scope.editSet = () => {
            Admin.edit($scope.data.edit)
                .then(res => {
                    $scope.$emit("edit", $scope.data.edit);
                })
        };

        $scope.remove = (id) => {
            Admin.remove(id)
                .then(res => {
                    $scope.$emit("remove", id);
                })
        };
    });


