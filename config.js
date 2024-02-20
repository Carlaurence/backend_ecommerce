const dotenv = require('dotenv').config();

const config = { 
    appConfig:{//CONEXION API
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },

    dbConfig:{//CONEXION DB 
        
        host: process.env.DB_HOST, //HOST DE CONEXION LOCAL A MONGODB
        port: process.env.DB_PORT, //PORT DE CONEXION LOCAL A MONGODB
        
        uri: process.env.MONGODB_URI, //URI DE CONEXION ATTLASIAM A MONGODB
        name: process.env.MONGODB_NAME //NOMBRE DE LA BBDD EN ATTLASIAM - MONGODB
    },

    cloudinaryConfig:{//CONEXION A CLOUDINARY REPOSITORY
        name: process.env.CLOUDINARY_NAME,
        key: process.env.CLOUDINARY_API_KEY,
        secret: process.env.CLOUDINARY_SECRET
    }
}
module.exports = config;