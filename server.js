const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();
const uri ='mongodb+srv://meiching:T%40ylor0213@cluster0.23qtgb3.mongodb.net/testingdb?retryWrites=true&w=majority'
// const uri ='mongodb://localhost:27017/testingdb';

const Route= require('./routes/all_routes');
mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
const db= mongoose.connection;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});

app.use('/api',Route);

