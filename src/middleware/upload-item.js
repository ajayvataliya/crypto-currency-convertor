// const util = require("util");
const multer = require("multer");
const path = require("path")



const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        console.log('---------------------------filename', file);
        // let ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
});

const uploadItem = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        console.log('----------------------------------------file', file);
        if (
            file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"
        ) {
            callback(null, true)
        } else {
            console.log('only jpg & png file supported');
            callback(null, false)
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }
})

module.exports = uploadItem;
