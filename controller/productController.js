const { response } = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const cloudinary = require('../cloudinary/cloudinary')
const fs = require('fs-extra')

/**POST NEW PRODUCT http://localhost:4002/api/product/:id *MIDDLEWARE*/
exports.postProduct = async (req, res) => {
    const { id } = req.params;//CategoryID
    const { brand, description, price } = req.body;
    try {
        const category = await Category.findById(id)
        const product = new Product({ brand, description, price })
        if (req.files?.image) {
            console.log(req.files.image)
            const result = await cloudinary.uploadImage(req.files.image.tempFilePath)//image => depende del nombre que le asignemos al objeto req.file en el key del formData 
            console.log(result)
            product.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)//borrar los archivos de la carpeta temporal .8uploads
        }
        product.categoryId = category.id
        product.creatorUserId = req.user.id;
        //console.log(product)
        const newProduct = await product.save()
        res.status(200).json({ msg: newProduct })
    } catch (error) {
        res.json({ msg: error })
    }
}

/**GET ALL PRODUCTS http://localhost:4002/api/product *PUBLIC ACCESS*/
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ msg: products })
    } catch (error) {
        res.json({ msg: error })
    }
}

/**GET PRODUCTS BY CATEGORY http://localhost:4002/api/product/:id *PUBLIC ACCESS*/
exports.getProductsByCategory = async (req, res) => {
    const { id } = req.params;//CategoryID
    try {
        const products = await Product.find({ categoryId: id });
        //console.log(products)
        if (products.length === 0) {
            res.status(200).json({ msg: 'There are not products in this category' })
        } else {
            res.status(200).json({ msg: products })
        }

    } catch (error) {
        res.json({ msg: error })
    }
}

/**GET PRODUCT BY ID http://localhost:4002/api/product/byid/:id *PUBLIC ACCESS*/
exports.getProductsById = async (req, res) => {
    const { id } = req.params;//ProductId
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.status(200).json({ msg: 'Product does not exist' })
        } else {
            res.status(200).json({ msg: product })
        }
    } catch (error) {
        res.json({ msg: error })
    }
}

/**DELETE PRODUCT http://localhost:4002/api/product/:id *MIDDLEWARE*/
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;//ProductID
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.status(404).json({ msg: "Product does not exist" })
        } else {
            if(product.creatorUserId.toString() !== req.user.id.toString()){
                res.status(200).json({ msg: 'You are not authorized to delete this Product because it was created by other user'})

            }else{
                if (product.image?.public_id) {//DELETE FROM CLOUDINARY 
                    const public_id = product.image.public_id
                    await cloudinary.deleteImage(public_id)
                }
                res.status(200).json({ msg: "Product was deleted" })
                await Product.deleteOne({ _id: id })//DELETE FROM MONGODB
            }
        }
    } catch (error) {
        res.json({ msg: error })
    }
}

/**PUT PRODUCT http://localhost:4002/api/product/:id *MIDDLEWARE*/
exports.updateProduct = async (req, res) => {
    const { id } = req.params;//ProductID
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(200).json({ msg: 'Product does not exist' })
        } else {

            if(product.creatorUserId.toString() !== req.user.id.toString()){
                res.status(200).json({ msg: 'You are not authorized to update this Product because it was created by other user'})

            }else{
                if (req.files?.image) {//if a 'file' is coming from the frontend, it's because user is sending a new image to replace the last one
                    await cloudinary.deleteImage(product.image.public_id)//delete the last image in cloudinary
    
                    const result = await cloudinary.uploadImage(req.files.image.tempFilePath)//new image is created in cloudinary
                    product.image = {//this information will replace the last {public_id, secure_url} in MongoDB 
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    }
                    await fs.unlink(req.files.image.tempFilePath)//delete temp/files from the /uploads folder
                }
    
                product.brand = req.body.brand || product.brand
                product.description = req.body.description || product.description
                product.price = req.body.price || product.price 
                product.save()
                //res.status(200).json({ msg: product })
                res.send(product)
            }
        }
    } catch (error) {
        res.json({ msg: error })
    }
}
