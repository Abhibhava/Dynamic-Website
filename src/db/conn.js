// this javascript file is for connecting the database
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/thapadynamic";


mongoose.connect(uri,{useNewUrlParser:true, useunifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));