import express from 'express';
import hbs from 'hbs';
// import handlebars from 'express-handlebars'
// import __dirname from "./utils.js"
// import ProductManager from "./src/models/ProductManager.js";
import products from "./routes/productos.router.js";
import carts from './routes/carts.js';
import __dirname from './utils/utils.js'

import {Server} from 'socket.io'

const app = express();

const port = 8080;

// const productos = new ProductManager('../data/productos.json');

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/products', products)
app.use('/api/carts', carts)


app.get('/productos', (req, res) =>{
    return res.render('productos')
})

app.get('/productos-real-time', (req, res) =>{
    return res.render('productos-real-time')
})

// app.get('*', (req, res) =>{
//     return res.render('404')
// })

app.get('/', function (req, res) {
    return res.send("<h1 style ='color: red'>Desafio para CoderHouse</h1>")
});

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer)

io.on('connection', socket =>{
    console.log('Nuevo cliente conectado')
})