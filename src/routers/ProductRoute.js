const router = require('express').Router();
const Product = require('../models/ProductModel');
const multer = require("multer");
const { Op } = require('sequelize');

router.get("/products/", async (req, res) => {
  try {
    const products = await Product.findAll();
      const productsWithBase64Images = products.map(product => {
          return {
              ...product.get(),
              imagen: product.imagen ? product.imagen.toString('base64') : null,
          };
      });

    res.json(productsWithBase64Images);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
       const productWithBase64Image = {
        ...product.get(),
        imagen: product.imagen ? product.imagen.toString('base64') : null,
       };
      res.json(productWithBase64Image);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/products/", upload.single("image"), async (req, res) => {
  const { nombre, precio } = req.body;
  const imagenBuffer = req.file ? req.file.buffer : null;
  try {
    await Product.sync();
    const producto = await Product.create({
      nombre: nombre,
      precio: precio,
      imagen: imagenBuffer,
    });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
    console.log(error);
  }
});

router.put("/products/",upload.single("image"), async (req, res) => {
    const { nombre, nuevoNombre, precio } = req.body;
    const imagenBuffer = req.file ? req.file.buffer : null;
    try {
      const product = await Product.findOne({ where: { nombre: nombre } });
      if (product) {
        console.log(product);
        
        product.nombre = nuevoNombre || product.nombre;
        product.precio = precio || product.precio;
        product.imagen = imagenBuffer || product.imagen;
        await product.save();
        res.json(product);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  });
  
  router.delete("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id: id } });
  
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
  
      await product.destroy();  
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  });
  

module.exports = router;