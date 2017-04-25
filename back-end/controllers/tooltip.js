const Tooltip = require("../model/tooltip");


module.exports = {

    get(req, res, next) {
        Tooltip.find({}, (err, tolt) => {
            if(err) {
                next();
            }else if(!tolt) {
                next();
            }else {
                res.json(tolt);
            }
        })
    },

    add(req, res, next) {
        const data = req.body;

        const tooltip = new Tooltip({
            textToolt: data.textToolt,
            select: data.select,
            img: data.img
        });

        tooltip.save((err, save) => {
            if(err) {
                next();
            }else if(!save) {
                next();
            }else {
                res.json(save);
            }
        })
    },

    edit(req, res, next) {
        const data = req.body;

        Tooltip.findByIdAndUpdate(data.id, {$set: {
            textToolt: data.textToolt,
            select: data.select,
            img: data.img
        }}, (err) => {
            if(err) {
                next();
            }else {
                res.json({status: 1});
            }
        })
    },

    remove(req, res, next) {
        const data = req.body;

        Tooltip.findByIdAndRemove(data.id, (err) => {
            if(err) {
                next();
            }else {
                res.json({status: 1});
            }
        })
    }
};