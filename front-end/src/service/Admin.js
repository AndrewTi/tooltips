angular.module("Admin", [])
    .factory("Admin", ($http) => {
        const baseUrl = "http://localhost:3011/api/";

        const add = (data) => {
            let query = {
                textToolt: data.textToolt,
                select: data.select,
                img:data.img
            };

            return $http.post(baseUrl+"add", JSON.stringify(query));
        };

        const edit = (data) => {
            let query = {
                id: data._id,
                textToolt: data.textToolt,
                select: data.select,
                img:data.img
            };

            return $http.post(baseUrl+"edit", JSON.stringify(query));
        };

        const remove = (id) => {
            let query = {id: id};

            return $http.post(baseUrl+"remove", JSON.stringify(query));
        };

        return {
            add    : add,
            edit   : edit,
            remove : remove
        }
    });