var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var today=Number(new Date())
var ToDoDetailsSchema = new Schema({
                todo_id:{type: String,default:""},
                decs:{type:String,default:""},
                name:{type: String,default:""},
                date:{type: Date},
                isDone:{type:Boolean,default:false},  
                todo_link:{type: String,default:""},
                todo_task:{type: String,default:""},
                delete_flag:{type:String,default:"N"}
    });
module.exports = mongoose.model('ToDoDetailsSchema', ToDoDetailsSchema);
