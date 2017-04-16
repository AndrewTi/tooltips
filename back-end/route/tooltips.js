const route   = require("express").Router();
const tooltip = require("../controllers/tooltip.js");

route
    .get("/get", tooltip.get)
    .post("/add", tooltip.add)
    .post("/edit", tooltip.edit)
    .post("/remove", tooltip.remove);


module.exports = route;