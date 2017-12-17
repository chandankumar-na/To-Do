var express = require('express');
var appRouter = express.Router();
var app = express();
var path = require('path');
var dbHelper = require("./dbHelper.js");




//get all Invoices
appRouter.route('/fetchToDo').post(function (req, res) {
    console.log("/fetchToDo")
    dbHelper.fetchToDo(req, function (result) {
        res.json({ result: result });
    })
});


//update single Invoice
appRouter.route('/deleteToDo').post(function (req, res) {
    console.log("/deleteToDo")
    dbHelper.deleteToDo(req, function (result) {
        res.json({ result: result });
    })
});


//update single Invoice
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


//add single Invoice =>this is to add data throw postman==>testing purpose
appRouter.route('/addToDo').post(function (req, res) {
    console.log("/addToDo")
    dbHelper.addToDo(req, function (result) {
        // console.log(result)
        res.json({ result: result });
    })
});
module.exports = appRouter;