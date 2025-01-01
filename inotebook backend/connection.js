const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect("mongodb://localhost:27017/inotebook").then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("Error in connection");
});
}

module.exports = connectDb;