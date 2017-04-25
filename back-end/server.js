const cors      = require("cors");
const mongo     = require("mongo");
const express   = require("express");
const mongoose  = require("mongoose");
const parser    = require("body-parser");


//const config = JSON.parse(process.env.APP_CONFIG);
// let query = "mongodb://" + config.mongo.user + ":" + "123123q" + "@" +
//     config.mongo.hostString;

mongoose.connect("mongodb://localhost:27017/tooltips");
mongoose.connection.on('error', (err) => {
    console.log(err);
});

const app = express();

app.use(cors());

app
    .use(parser.json({limit: "50mb"}))
    .use("/",express.static("./dest"))
    .use("/api", require("./route/tooltips.js"));


app.listen(3011);