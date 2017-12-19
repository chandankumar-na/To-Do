var express = require('express');
var appRouter = express.Router();
var app = express();
var path = require('path');
var dbHelper = require("./dbHelper.js");

appRouter.route('/fetchToDo').post(function (req, res) {
    console.log("/fetchToDo")
    dbHelper.fetchToDo(req, function (result) {
        res.json({ result: result });
    })
});


appRouter.route('/deleteToDo').post(function (req, res) {
    console.log("/deleteToDo")
    dbHelper.deleteToDo(req, function (result) {
        res.json({ result: result });
    })
});


appRouter.route('/updateToDo').post(function (req, res) {
    console.log("/updateToDo")
    dbHelper.updateToDo(req, function (result) {
        res.json({ result: result });
    })
});


appRouter.route('/moveTo').post(function (req, res) {
    console.log("/moveTo")
    dbHelper.moveTo(req, function (result) {
        res.json({ result: result });
    })
});


appRouter.route('/updateDate').post(function (req, res) {
    console.log("/updateDate")
    dbHelper.updateDate(req, function (result) {
        res.json({ result: result });
    })
});
appRouter.route('/updateTime').post(function (req, res) {
    console.log("/updateTime")
    dbHelper.updateTime(req, function (result) {
        res.json({ result: result });
    })
});


appRouter.route('/addToDo').post(function (req, res) {
    console.log("/addToDo")
    dbHelper.addToDo(req, function (result) {
        // console.log(result)
        res.json({ result: result });
    })
});
module.exports = appRouter;