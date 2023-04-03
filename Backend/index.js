const connectTomongo = require('./db');
const express = require('express');

connectTomongo();

const app = express();
const port = 5000;

app.use(express.json());
// Available  Routes
app.use("/api/auth",  require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

app.get('/',(req,res)=>{
    res.send("Hello king");
});

app.listen(port, ()=>{
    console.log(`running on port at  ${port}`);
})