const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes

app.get('/', (req, res) => {
    res.send(`Hello Node API`);
});

app.get('/blog', (req, res) => {
    res.send(`Hello Blog, My name is Jeet`);
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await product.create(req.body)
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

//Update Product

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        //We cannot find any product in database

        if (!product) {
            return res.status(404).json({ message: `cannot find my product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//Delete a product

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb://127.0.0.1:27017/Products')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(2000, () => {
            console.log('Node API app is running on port 2000')
        });
    }).catch((error) => {
        console.log(error);
    })