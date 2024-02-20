const cloudinary = require('cloudinary')
const { cloudinaryConfig } = require('../config')

/**CLOIDINARY API CONNECTION */
cloudinary.v2.config({
    cloud_name: cloudinaryConfig.name,
    api_key: cloudinaryConfig.key,
    api_secret: cloudinaryConfig.secret,
    secure: true
})

/**FUNCION PARA SUBIR IMAGES */
exports.uploadImage = async(filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'imageUploaderApp' //NOMBRE DEL FOLDER A DONDE VAN LAS IMAGENES SUBIDAS AL CLOUDINARY
    })
}
/**
async function uploadImage(filePath) {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'imageUploaderApp'
    })
}
module.exports = uploadImage;
 */

/**FUNCION PARA ELIMINAR IMAGES */
exports.deleteImage = async(publicId) => {
    return await cloudinary.v2.uploader.destroy(publicId)
}
/**
async function deleteImage(publicId) {
    return await cloudinary.v2.uploader.destroy(publicId)
}
module.exports = deleteImage;
 */