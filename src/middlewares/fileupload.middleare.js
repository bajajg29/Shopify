//1. import multer
import multer from "multer";

//2.configure with storage with filename and location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const filename = new Date().toISOString().replace(/:/g, '-') + file.originalname;
    cb(null, filename);  
},
});

export const upload = multer({ storage: storage, });



