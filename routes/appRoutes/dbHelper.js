
var ToDoDetailsSchema = require('../../models/ToDoDetailsSchema');
var request = require('request');
var to_json = require('xmljson').to_json;
var localStorage=require('localStorage');
var request_url = require("../../configFiles/dbConfig");
var self = module.exports = {

    updateDate: function (req, callback) {
        console.log(req.body)
        ToDoDetailsSchema.findOneAndUpdate({ todo_id: req.body.todo_id },{ $set: { date: req.body.date } },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    return callback(result);
                }
            });
    },
    updateToDo: function (req, callback) {
        console.log(req.body)
        ToDoDetailsSchema.findOneAndUpdate({ todo_id: req.body.todo_id },{ $set: { name: req.body.name } },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    return callback(result);
                }
            });
    },
    moveTo: function (req, callback) {
        console.log(req.body)
        ToDoDetailsSchema.findOneAndUpdate({ todo_id: req.body.todo_id },{ $set: { todo_link: req.body.todo_link } },
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    console.log(result)
                    return callback(result);
                }
            });
    },
    fetchToDo: function (req, callback) {
        console.log(req.body)
        var query="";
        if(req.body.todo_task=='task'){
            query={ delete_flag:"N",todo_task:req.body.todo_task,todo_link:req.body.todo_link}
        }else{
            query={ delete_flag:"N",todo_task:req.body.todo_task}
        }
        ToDoDetailsSchema.find(query ,
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(result);
                }
            });
    },

    deleteToDo: function (req, callback) {
        console.log(req.body.todo_id)
        ToDoDetailsSchema.remove({ $or: [{todo_id:req.body.todo_id},{todo_link:req.body.todo_id}]} ,
            function (err, result) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(result);
                }
            });
    },

    addToDo: function (req, callback) {
        console.log(req.body)
        console.log(req.body.todo_id)
        var toDoDetailsSchema = new ToDoDetailsSchema({
            todo_id: req.body.todo_id,
            decs: req.body.decs,
            name: req.body.name,
            date:req.body.date,
            todo_task:req.body.todo_task,
            todo_link:req.body.todo_link
        });
        toDoDetailsSchema.save(function (err, result) {
            if (err) {
                return callback(false);
            }
            return callback(true);
        });
    }
}