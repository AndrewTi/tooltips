angular.module("ManipulationData", [])
    .factory("ManipulationData", ($http) => {
        const baseURL = "http://localhost:3011/api/";

        const loadData = () => {
            return $http.get(baseURL+"get")
                .then(data => data);
        };

        return {
            loadData: loadData
        }
    });