const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file');
const { v4: uuidv4} = require('uuid');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename: (req,file,cb)=>{
        const uniquename=`${file.fieldname + '-' + Date.now()}${path.extname(file.originalname)}`
        cb(null, uniquename);
    }
})

let upload=multer({ 
    storage: storage,
    limit: {fileSize:1000000 * 100} //100mb
 }).single('myfile');   //for uploading single file

router.post('/',(req,res)=>{
    //Store file
    upload(req,res,async(err)=>{
    
    //validate request
    if(!req.file){
        return res.json({error:'All fields are required'});
    }

    if(err){
        console.log(err);
        return res.status(500).send({error:err.message});
    }

    //Store into Database
    const file= new File({
        filename:req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,  //mix of destination and file name
        size: req.file.size
    });

    const response= await file.save();
    console.log(response);
    //http://localhost:8000/files/232342jdfdf
    //Response->Link
    return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });

    });
});

router.post('/send',async (req,res)=>{
    const {uuid, emailTo, emailFrom}=req.body;
    //validate request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({error:"All fields are required"});
    }

    //Get data from database
    const file=await File.findOne({uuid:uuid});
    if(file.sender){
        return res.status(422).send({error:"Email already sent"});
    }

    file.sender= emailFrom;
    file.receiver=emailTo;

    //saving the file
    const response= await file.save();
})

module.exports=router;
