import express from 'express';
import ProductManager from "../ProductManager.js";
import products from "./routes/productos.router.js";
import carts from './routes/carts.js';

const app = express();
const port = 8080;

const productos = new ProductManager('../data/productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', products)
app.use('/src/routes/carts.js', carts)

app.get('/', function (req, res) {
    return res.send("<h1 style ='color: red'>Desafio para CoderHouse</h1>")
});

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});