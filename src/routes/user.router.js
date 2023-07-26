import { Router } from "express";

const router = Router()

router.get("/", async(req, res)=>{
    try {
        let users = await userModel.find() 
        res.json({status: "success", payload: users})
    } catch (error) {
        console.log("No puede obtener usuarios" + error)
    }
})

router.post("/", async(req, res) =>{
    const { first_name, last_name, edad, email} = req.body
    if(!first_name || !last_name || !edad || !email)
        return res.json({status:"error", error:"Datos incompletos"})
    try {
        const resultado = await userModel.create({
            first_name,
            last_name,
            edad,
            email
        })
        return res.json({status:"success", payload:resultado})

    } catch (error) {
        console.log("No puede crear usuario" + error)
    }
})

router.put("/:id", async (req, res) =>{
    const { id } = req.params;
    const { first_name, last_name, edad, email } = req.body;
    if(!first_name || !last_name || !edad || !email)
    return res.json({status:"error", error:"Datos incompletos"})
    const newUser = {
        first_name,
        last_name,
        edad,
        email
    }
    try{
    const resultado =  await userModel.updateOne({_id: id}, newUser)
    return res.json({status:"success", payload:resultado})    
    } catch (error) {
        console.log("No se puede actualizar el usuario" + error)
    }
});

router.delete("/:id", async (req, res) =>{
    const {id} = req.params
    try {
        const resultado = await userModel.deleteOne ({ _id:id })
        return res.json({ status: "success", payload: resultado})
    } catch (error) {
        console.log("No se puede eliminar usuario:" + error)
    }
} )

export default router