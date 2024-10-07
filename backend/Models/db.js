const dotenv = require("dotenv");

dotenv.config();

const mongoose = require('mongoose')

const mongo_url = process.env.mongo_conn;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log('Mongodb Connection  Error', err);
    })
