import express from 'express';
import hbs from 'hbs';

import router from './routes/productos.router.js';
import mongoose  from 'mongoose';

import products from "./routes/productos.router.js";
import carts from './routes/carts.js';
import __dirname from './utils/utils.js'

import {Server} from 'socket.io'
import ProductManager from './models/ProductManager.js';
import userRouter from './routes/user.router.js'

const productos = new ProductManager()

const app = express();

const port = 8080;

mongoose.connect("mongodb+srv://MarianoBriozzo:929390@cluster0.rmtkxoi.mongodb.net/?retryWrites=true&w=majority")

// const productos = new ProductManager('../data/productos.json');

app.use(express.static('src/public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products)
app.use('/api/carts', carts)
app.use("/api/users", userRouter)


app.get('/productos', (req, res) =>{
  
    return res.send('productos')
})

app.get('/accesorios', (req, res) =>{
    return res.send('accesorios')
})

app.get('*', (req, res) =>{
    return res.send('404')
})

// app.get('/', function (req, res) {
//     return res.send("<h1 style ='color: red'>Desafio para CoderHouse</h1>")
// });

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer)

io.on('connection', socket =>{
    console.log('Cliente conectado');
})
    io.on('disconnect', () =>{
        console.log('El cliente se desconecto');
    })

