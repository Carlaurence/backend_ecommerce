const { response } = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const cloudinary = require('../cloudinary/cloudinary')
const fs = require('fs-extra')

/**GET ALL CATEGORIES http://localhost:4002/api/category *PUBLIC*/
exports.getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find()
        res.status(200).json({ msg: categories})
    }catch(error){
        res.json({ msg: error})
    }
}

/*POST NEW CATEGORY http://localhost:4002/api/category *MIDDLEWARE*/
exports.postCategory = async (req, res) => {
    const { name } = req.body;
    try{
        const nameCategory = await Category.findOne({name:name})
        if(nameCategory){
            res.status(200).json({ msg: 'Error: The category was previouly created'})    
        }else{
            const category = new Category({ name })
            if(req.files?.image){
                const result = await cloudinary.uploadImage(req.files.image.tempFilePath)//image => depende del nombre que le asignemos al objeto req.file en el key del formData 
                category.image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
                await fs.unlink(req.files.image.tempFilePath)//borrar los archivos de la carpeta temporal .8uploads
            }
            category.creatorUserId = req.user.id;
            const newCategory = await category.save()
            //res.send( newCategory)
            res.status(200).json({ msg: newCategory})
        }
    }catch(error){
        res.json({ msg: error})
    }
}

/**DELETE CATEGORY http://localhost:4002/api/category/:id *MIDDLEWARE*/
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;//CategoryID
    try{
        const category = await Category.findById(id)
        const products = await Product.findOne({categoryId:id});
        if(!category){
            res.status(404).json({ msg: "Category does not exist"})
        }else{
            if(products){
                res.status(200).json({ msg: 'This Category can not be deleted because some products are linked'})
            }else{
                if(category.creatorUserId.toString() !== req.user.id.toString()){
                    res.status(200).json({ msg: 'You are not authorized to delete this Category because it was created by other user'})
                }else{
                    if(category.image?.public_id){//DELETE FROM CLOUDINARY
                        const public_id = category.image.public_id
                        await cloudinary.deleteImage(public_id)
                    }
                    await Category.deleteOne({ _id: id })//DELETE FROM MONGODB
                    
                    res.status(200).json({ msg: "Category was deleted"})
                }
            }
        }
    }catch(error){
        res.json({ msg: error})
    }
}