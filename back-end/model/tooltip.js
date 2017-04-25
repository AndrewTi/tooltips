const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tooltip = new Schema({
    img: String,
    textToolt: [{text: String, head: String}],
    select: {text: String, head: String}
}, {
    collection: "tooltips"
});

module.exports = mongoose.model("Tooltip", Tooltip);