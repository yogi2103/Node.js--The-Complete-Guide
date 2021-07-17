const router=require('express').Router();
const multer=require('multer');
const path=require('path');
const File=require('../models/file');
const {v4:uuid4}=require('uuid');

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

router.post('/',async (req,res)=>{
    //validate request
    if(!req.file){
        return res.json({error:'All fields are required'});
    }

    //Store file
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:err.message});
        }
    })
    
    //Store into Database
    const file= new File({
        filename:req.filename,
        uuid: uuid4(),
        path: req.file.path,  //mix of destination and file name
        size: req.file.size
    });

    const reponse= await file.save();
    return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
    //http://localhost:8000/files/232342jdfdf
    //Response->Link
});

module.exports=router;
