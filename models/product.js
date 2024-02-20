const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        brand: { type: String, require: true, trim: true, uppercase:true},
        description: { type: String, require: true, trim: true },
        price:{type:Number, require:true, trim:true},
        categoryId: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
        creatorUserId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
        image: {
            public_id: String, 
            secure_url: String
        }
    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", ProductSchema)