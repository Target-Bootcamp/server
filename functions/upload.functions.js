const multer = require('multer');
const upload = multer({dest:"./DL/root/temp"})

const uploadFile = (file)=>{
    
    return upload.single(file)
}


module.exports ={uploadFile}

