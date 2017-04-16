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
                head: "",
                text: "",
                img: ""
            },

            edit: {
                id: "",
                head: "",
                text: "",
                img: ""
            }
        };

        $scope.edit = {
            status: false,
            show: (bool, edit) => {
                $scope.edit.status = bool;
                if(!bool) return false;
                $scope.data.edit = {
                    _id: edit._id,
                    head: edit.head,
                    text: edit.text,
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


