const mongoose = require('mongoose');

const  connectTomongo = async() =>{
  await  mongoose.connect("mongodb://127.0.0.1:27017/inote");
  console.log("connect with mongodb successfully");
}

module.exports = connectTomongo;