const mongoose = require('mongoose')
const {dbConfig} = require('../config')
mongoose.set('strictQuery', true)

const connectDB = async () => {
    try{
        const stringConnection = await mongoose.connect(
            `${dbConfig.uri}${dbConfig.name}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${stringConnection.connection.host}:${stringConnection.connection.port}`;
        //console.log(`MongoDB Conectado en :${url}`);
        //console.log(`MongoDB Conectado en : ${dbConfig.uri}${dbConfig.name}`);
        console.log('MongoDB Multicomerciales_V2 conectado...')

    }catch(error){
        console.log(`error : ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;