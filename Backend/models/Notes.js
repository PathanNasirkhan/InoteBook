const mongoose = require('mongoose');

const Noteschema = new mongoose.Schema({
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