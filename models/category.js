const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        name: { type: String, require: true, trim: true, uppercase:true },
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
module.exports = mongoose.model("Category", CategorySchema)