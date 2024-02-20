const mongoose = require('mongoose')
const {dbConfig} = require('../config')
mongoose.set('strictQuery', true)

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(
            `${dbConfig.uri}${dbConfig.name}`, { useNewUrlParser: true, useUnifiedTopology: true }
            )
            const url = `${connection.connection.host}:${connection.connection.port}`;
            //console.log(`MongoDB Conectado en :${url}`);
            //console.log(`MongoDB Conectado en : ${dbConfig.uri}${dbConfig.name}`);
            console.log('MongoDB Ecommerce conectado...')
    }catch(error){
        console.log(`error: ${error.message}`)
        process.exit(1)
    
    }
}
module.exports = connectDB;