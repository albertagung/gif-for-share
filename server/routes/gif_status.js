const router = require('express').Router();
const gifController = require('../controllers/gif_status')
const multer = require('multer')

router.get('/upload', gifController.upload)

module.exports = router