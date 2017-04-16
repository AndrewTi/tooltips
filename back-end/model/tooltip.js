const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tooltip = new Schema({
    head: String,
    text: String,
    img: String
}, {
    collection: "tooltips"
});

module.exports = mongoose.model("Tooltip", Tooltip);