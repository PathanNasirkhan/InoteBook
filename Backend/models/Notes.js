const mongoose = require('mongoose');
const {Schema} = mongoose;
const Noteschema = new mongoose.Schema({
    user: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'user'
    },
    title : {
        type:String,
        require:true
    },
    description : {
        type:String,
        required:true,
        unique:true
    },
    tag : {
        type:String,
        default:"General"
    },
    date : {
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("notes",Noteschema);