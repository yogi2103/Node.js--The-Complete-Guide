const router=require('express').Router();
const multer=require('multer');
const path=require('path');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename: (req,file,cb)=>{
        const uniquename=`${file.fieldname + '-' + Date.now()}${path.extname(file.originalname)}`
        cb(null, uniquename);
    }
})

let upload=multer({ storage: storage });

router.post('/',(req,res)=>{
    //validate request
    if(!req.file){
        return res.json({error:'All fields are required'});
    }

    //Store file
    //Store into Database
    //Response->Link
});

module.exports=router;
