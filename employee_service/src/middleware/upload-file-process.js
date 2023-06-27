const multer = require('multer');
const path = require('path')

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, path.filename());
    },
});

const upload = multer({ storage: storage });

module.exports = upload;