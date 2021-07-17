const mongoose=require('mongoose');

function connectDB(){
    //database connection
    mongoose.connect('url',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    const connection=mongoose.connection;

    //For Successfull Connection
    connection.once('open',function(){
        console.log("Succesfull Connection!");
    }).catch(err=>{
        console.log('Connection failed');
    })
}

module.exports=connectDB;