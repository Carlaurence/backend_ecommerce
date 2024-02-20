const express = require('express')
const { appConfig } = require('./config')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser');

connectDB();
//IMPORT ROUTES AS A MIDDLEWARE
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')
const tokenRoutes = require('./routes/tokenRoutes')


const app = express()
const morgan = require('morgan')//npm i morgan
app.use(morgan('dev'))//MUESTRA EN CONSOLA CADA QUE SE EJECUTE UN MICROSERVICIO

//Middleware
app.use(cors())
app.use(express.json({ extended: true}))//HABILITA EL req.body
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//CREACION DE LAS RUTAS PRIMARIAS DE ENLACE A LA BBDD + MIDDLEWARE ok
app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/user', userRoutes)
app.use('/api/login', tokenRoutes)

app.get('/', (req, res) => res.send(`Puerto Conectado a la API BackEnd Multicamiones`))

const port = process.env.PORT || appConfig.port 
console.log(`http//${appConfig.host}:${appConfig.port}`)
app.listen(port, () => {
    console.log("port running in: "+port);
});
