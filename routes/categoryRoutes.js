const express = require('express')
const router = express.Router();
const categoryController = require('../controller/categoryController')
//MIDDLEWARE 
const fileUpload = require('express-fileupload')
//PONEMOS LOS MIDDLEWARE EN UNA CONST PARA USAR SUS METODOS  
const uploadExpress = fileUpload({ useTempFiles : true, tempFileDir : './uploads'})
//MIDDLEWARE
const tokenVerifier = require('../middleware/tokenVerifier')


//CREACION ENDPOINTS
//IMPORTANTE: TODOS LOS ENDPOINT DONDE SE CREE NU NEW IMAGE, REQUIERE EL MIDDLEWARE
router.get('/', categoryController.getAllCategories)
router.post('/',tokenVerifier, uploadExpress, categoryController.postCategory)//double middleware
router.delete('/:id', tokenVerifier, categoryController.deleteCategory)//token middleware

module.exports = router;