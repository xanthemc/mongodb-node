const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const uri ='mongodb+srv://meiching:T%40ylor0213@cluster0.23qtgb3.mongodb.net/testingdb?retryWrites=true&w=majority'
// const uri ='mongodb://localhost:27017/testingdb';

const EmployeeRoute= require('./routes/employee');
mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
const db= mongoose.connection;

/* async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); */
// db.on('error,', (err)=>{
//     console.log(err);
// })
// db.once('open,', (res)=>{
//     console.log('Databases connected');
    
// })
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});

app.use('/api',EmployeeRoute);

