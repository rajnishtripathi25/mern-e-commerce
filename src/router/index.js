var express = require('express');
var router = express.Router();
const Product = require("../models/Product")
const User = require("../models/User")
const AddToCart = require("../models/AddToCart")
const AmountModel = require('../models/AmountPay')

router.post('/addproducts', async (req, res) => {
    try {

        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.get('/products', async (req, res) => {
    try {
        const result = await Product.find({})
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const newuser = new User(req.body)
        let result = await newuser.save()

        result = result.toObject()
        delete result.password
        delete result.confirm_password
        const newuserAmount = new AmountModel({ email: req.body.email, amount: 0, cart: 0 })
        let updateAmount = await newuserAmount.save()
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/login', async (req, res) => {
    try {

        let result = await User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] })
        if (result.length > 0) {

            result = result[0].toObject()
            delete result.password
            delete result.confirm_password
            delete result.__v
        }

        res.send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/addtocart', async (req, res) => {
    try {

        const { amount, cart, email, ...product } = req.body
        const isProductExist = await AddToCart.find({ $and: [{ userId: product.userId }, { id: product.id }] })
        if (isProductExist.length === 0) {

            const item = new AddToCart(product)
            let result = await item.save()
            await AmountModel.updateOne({ email: req.body.email }, {
                $set: {
                    amount: (req.body.amount + product.price),
                    cart: (req.body.cart + 1 )
                }
            })
            
            res.send({ isExist: false , ...result })
        }
        else {
            res.send({isExist:true})
        }
    } catch (err) {
        res.status(400).send(err)
    }
})
router.get('/cartdata/:userid', async (req, res) => {
    try {
        const result = await AddToCart.find({ userId: req.params.userid })
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/deleteproductfromcart', async (req, res) => {
    try {

        const result = await AddToCart.deleteOne({ $and: [{ id: req.body.productId }, { userId: req.body.userId }] })
        await AmountModel.updateOne({ email: req.body.email }, {
            $set: {
                amount: req.body.amount,
                cart: req.body.cart
            }
        })
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/amountToPay', async (req, res) => {
    try {
        const result = await AmountModel.updateOne({ email: req.body.email }, {
            $set: {
                amount: req.body.amount,
                cart: req.body.cart
            }
        })
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})
router.get('/amount/:email', async (req, res) => {
    try {

        const result = await AmountModel.find({ email: req.params.email })
        res.send(result[0])
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/updatequantity', async (req, res) => {
    try {

        const result = await AddToCart.updateOne({ $and: [{ userId: req.body.userId }, { id: req.body.id }] },
            {
                $set: {
                    quantity: req.body.quantity
                }
            })
        await AmountModel.updateOne({ email: req.body.email }, {
            $set: {
                cart: req.body.cart,
                amount: req.body.amount
            }
        })
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router;