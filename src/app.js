import express from 'express';
import ProductManager from "../ProductManager.js";
import products from "./routes/productos.router.js";

const app = express();
const port = 3000;

const productos = new ProductManager('../data/productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', products)

app.get('/', function (req, res) {
    return res.send("<h1 style ='color: red'>Desafio para CoderHouse</h1>")
});

// app.get('/products', (req, res) => {
//     const { limit } = req.query;
//     const p = productos.getProduct();
//     let cantProductos;
//     if (limit)
//         cantProductos = p.slice(0, limit)
//     else
//         cantProductos = p;
//     return res.json({ cantTotal: p.length, productosLimitados: cantProductos });
// });

// // app.post("/products", (req, res) => {
// //     const produ = req.body;
// //     productos.push(produ);
// //     res.status(201).json(produ);
// // });

// // app.put("/products/:id", (req, res) => {
// //     const { id } = req.params;
// //     const { title, description, price, img, code, stock } = req.body;
// //     const producto = productos.find((producto) => producto.id == id);
// //     if (producto) {
// //         producto.title = title;
// //         producto.description = description;
// //         producto.price = price;
// //         producto.img = img;
// //         producto.code = code;
// //         producto.stock = stock;
// //         return res.json(producto);
// //     }
// //     res.json({ error: "Producto no encontrado" })
// // })

// // app.delete ("/products/:id", (req, res) => {
// //     const {id} = req.params;
// //     const producto = productos.find((producto) => producto.id == id);
// //     if (producto){
// //         const index = productos.indexOf(producto);
// //         productos.splice(index, 1);
// //         return res.json(producto);
// //     }
// //     res.json({error: "Producto no encontrado"})
// // })

// app.get('/products/:id', (req, res) => {
//     const { id } = req.params
//     return res.json(productos.getProductById(parseInt(id)))
// });

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});