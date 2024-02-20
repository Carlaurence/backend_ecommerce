const mongoose = require('mongoose')

const UserSchema = mongoose.Schema (
    {
        name: {type: String, require:true, trim:true, uppercase:true},
        email: {type: String, require:true, trim:true},
        password: {type: String, require:true, trim:true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema)