const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router()

const fileStorage = multer.diskStorage({
    destination: '/data/files', // Destination to store image
    filename: (req, file, cb) => {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1073741824   // 1073741824 Bytes = 1 GB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|mov)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload valid files only'))
        }
        cb(undefined, true)
    }
})

// For Single image upload
router.post('/uploadFile', fileUpload.single('file'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// For Multiple image uplaod
router.post('/uploadBulkFiles', fileUpload.array('files', 4), (req, res) => {
    res.send(req.files)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


module.exports = router