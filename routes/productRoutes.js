const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const tokenVerifier = require('../middleware/tokenVerifier')

//MIDDLEWARE 
//REQUERIDOS PARA PROCESAR INFORMACION QUE LLEGA EN FormData / multipart/form-data 
//HABILITAN LOS REQ.FILES
//const multer = require('multer')
//PONEMOS LOS MIDDLEWARE EN UNA CONST PARA USAR SUS METODOS Y REQ.FILES
//const uploadMulter = multer({ dest: '/uploads' })//uploadMulter.single('name del key') o uploadMulter.array('name del key')
const fileUpload = require('express-fileupload')
const uploadExpress = fileUpload({ useTempFiles : true, tempFileDir : './uploads'})



//CREACION ENDPOINTS
//IMPORTANTE: TODOS LOS ENDPOINT DONDE SE CREE NU NEW IMAGE, REQUIERE EL MIDDLEWARE
router.post('/:id', tokenVerifier, uploadExpress, productController.postProduct)//double middleWare
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductsByCategory)
router.get('/byid/:id', productController.getProductsById)
router.put('/:id', tokenVerifier, uploadExpress, productController.updateProduct)//double middleWare
router.delete('/:id', tokenVerifier, productController.deleteProduct)//token middleware

module.exports = router;
