const express=require('express');
const app=express();

const PORT=process.env.PORT ||3000;
const connectDB=require('./config/db');
connectDB();

//Routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
})