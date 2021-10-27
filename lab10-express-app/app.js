const expressFunctions = require('express')
const mongoose = require('mongoose')
var expressApp = expressFunctions();

const url = 'mongodb://localhost:27017/db_it';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
var Schema = require('mongoose').Schema;
const userSchema = Schema({
    type: String,
    id: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String,
}, { collection: 'products' });
let product
try {
    Product = mongoose.model('Products')
} catch (error) {
    Product = mongoose.model('Products', userSchema)
}
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://location:4200')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELECT, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Conten-Type,Option,Authorization')
    return next();
});
expressApp.use(expressFunctions.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MogoDB...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MogoDB...');
            res.status(500).send('Cannot connect to MogoDB')
        });
});
const addProduct = (productData) => {
    return new Promise((resolve, reject) => {
        var new_product = new Product(productData);
        new_product.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert product to DB!'))
            } else {
                resolve({ message: 'Product added successfully' })
            }
        });
    });
}
const getpoducts = () => {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, data) => {
            if (err) {
                reject(new Error('Cannot get products!'))
            } else {
                if (data) {
                    resolve(data);
                } else {
                    reject(new Error('Cannot get products!'))
                }
            }
        })
    })
}
expressApp.post('/products/add', (req, res) => {
    console.log('add');
    addProduct(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.get('/products/get', (req, res) => {
    console.log('get');
    getpoducts()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
        })
})

expressApp.listen(3000, function() {
    console.log('Listening on port 3000');
})