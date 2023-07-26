import { Router } from "express";
import ProductManager from "../models/ProductManager.js";

const productos = new ProductManager('../../data/productos.json');
const router = Router();



// router.get('/', (req, res) => {
//     const { limit } = req.query;
//     const p = productos.getProduct();
//     let cantProductos;
//     if (limit)
//         cantProductos = p.slice(0, limit)
//     else
//         cantProductos = p;
//     return res.json({ cantTotal: p.length, productosLimitados: cantProductos });
// });



router.get('/', async (req, res) => {
    const {page=1} = req.query;
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest}=
    await productsModel.paginate({}, {page, limit: 2, lean: true});

    const { limit } = req.query;
    const p = productos.getProduct();
    let cantProductos;
    if (limit)
        cantProductos = p.slice(0, limit)
    else
        cantProductos = p;
    return res.json({ cantTotal: p.length, productosLimitados: cantProductos });
});



router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, price, img, code, stock } = req.body;
    const producto = productos.find((producto) => producto.id == id);
    if (producto) {
        producto.title = title;
        producto.description = description;
        producto.price = price;
        producto.img = img;
        producto.code = code;
        producto.stock = stock;
        return res.json(producto);
    }
    res.json({ error: "Producto no encontrado" })
})



router.delete("/:id", async (req, res) =>{
    const {id} = req.params
    try {
        const resultado = await productos.deleteOne ({ _id:id })
        return res.json({ status: "success", payload: resultado})
    } catch (error) {
        console.log("No se puede eliminar producto:" + error)
    }
} )

router.get('/:id', (req, res) => {
    const { id } = req.params
    return res.json(productos.getProductById(parseInt(id)))
});


export default router;