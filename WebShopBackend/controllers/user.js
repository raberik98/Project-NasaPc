// model(s)
const User = require('../models/user');
const Product = require('../models/product');

// password hash
const bcrypt = require('bcrypt');

// custom id maker for generatedToken
const makeid = require('../util/makeid.js');

// nodemailer to send emails
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// sendgrid API key
require("dotenv").config();

const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY }));

exports.requestPasswordChange = (req, res) => {
    try {
        if (req.body.email) {

            let email = req.body.email;
            const generatedToken = makeid(32);

            User.findOne({ email })
                .then((user) => {
                    if (user) {

                        User.updateOne({ email }, { $set: { "passwordToken": generatedToken } })
                            .then(() => { })
                            .catch((error) => { console.log(error) })

                        transport.sendMail({
                            from: "tamas.robert1@students.jedlik.eu",
                            to: user.email,
                            subject: "NasaPC - Requested password change",
                            html: "<h3>New password</h3><br><p>Click this link to change your password: http://localhost:8080/change-password/" + generatedToken + " </p>"
                        });
                        return res.status(200).json({ "message": "Password change request sent!" });
                    } else {
                        return res.status(400).json({ "error": "Email does not exist!" });
                    }
                })
                .catch((error) => {
                    return res.status(400).json({ "error": "Unexpected error!" });
                })

        } else {
            return res.status(400).json({ "error": "No data received!" });
        }
    } catch (error) {
        return res.status(500).json({ "error": "Unexpected error!" });
    }
}

exports.changePassword = (req, res) => {
    try {
        if (req.body.token && req.body.newPassword) {

            let token = req.body.token;

            User.findOne({ "passwordToken": token })
                .then(async (user) => {

                    if (user) {

                        let password = await bcrypt.hash(req.body.newPassword, 5);

                        User.updateOne({ "passwordToken": token }, { $set: { password }, $unset: { "passwordToken": "" } })
                            .then(() => {
                                return res.status(200).json({ "message": "Password changed successfully!" });
                            })
                            .catch((error) => {
                                return res.status(500).json({ "error": "Unexpected error!" });
                            })

                    } else {
                        return res.status(400).json({ "error": "Bad token!" });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            return res.status(400).json({ "error": "newPassword not set!" });
        }
    } catch (error) {
        return res.status(500).json({ "error": "Unexpected error!" });
    }
}

exports.getWishList = (req, res) => {
    const session = req.cookies['LOCAL_KEY'];

    if (session) {

        User.findOne({ session })
            .then((user) => {

                if (user) {
                    let wishlist = user.wishList;
                    res.status(200).json(wishlist);
                }
            })
            .catch((error) => {
                res.status(404).json({ "error": "User not found!" });
            })
    } else {
        res.status(401).json({ "error": "No session!" });
    }
}

exports.addToWishList = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];
    const _id = req.params.productId;

    if (session) {

        User.findOne({ session })
            .then((user) => {

                if (user) {

                    var productWishList = [...user.wishList];

                    Product.findById(_id)
                        .then(product => {

                            if (product) {

                                var contains = productWishList.some(prod => {
                                    return JSON.stringify(product._id) === JSON.stringify(prod._id);
                                });

                                if (!contains) {

                                    productWishList.push(product);

                                    User.updateOne({ session }, { wishList: productWishList })
                                        .then(() => { return res.status(200).json({ "message": "Product has been added to your wishlist." }) })
                                        .catch((error) => { return res.status(500).json({ "error": "Failed adding product to your wishlist!" }) })
                                }
                                else {
                                    return res.status(400).json({ "error": "Failed adding product to your wishlist! Product is already wishlisted!" })
                                }
                            }
                            else { res.status(404).json({ "error": "Product not found!" }) }
                        })
                        .catch(err => { res.status(404).json({ "error": "Product not found!" }) });
                }
            })
            .catch((error) => {
                res.status(404).json({ "error": "User not found!" });
            })
    } else {
        res.status(401).json({ "error": "No session!" });
    }
}

exports.removeFromWishList = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];
    const _id = req.params.productId;

    if (session) {

        User.findOne({ session })
            .then((user) => {

                if (user) {

                    let userId = user._id;

                    Product.findOne({ _id })
                        .then(product => {


                            let productExists = false;
                            if (product) productExists = true

                            let productInWishListExists = false;

                            for (let index = 0; index < user.wishList.length; index++) {
                                if (user.wishList[index]._id == _id) {
                                    productInWishListExists = true;
                                    break;
                                }
                            }

                            if (productExists && productInWishListExists) {
                                var filteredWishList = user.wishList.filter(function (value, index, arr) {
                                    return value._id != _id;
                                });

                                User.updateOne({ _id: userId }, { $set: { wishList: filteredWishList } }).then(response => {
                                    return res.status(200).json({ "message": "Your WishList has been updated." })
                                })
                                    .catch(error => { return res.status(500).json({ "message": "Unexpected error!" }) })
                            }
                            else {

                                if (productExists && !productInWishListExists)
                                    return res.status(404).json({ "error": "Product is not wishlisted!" })
                                else
                                    return res.status(404).json({ "error": "Product not found!" })

                            }

                        })
                        .catch(error => { res.status(404).json({ "error": "Unexpected error!" }) })
                }
            })
            .catch((error) => {
                return res.status(404).json({ "error": "User not found!" });
            })
    } else {
        res.status(401).json({ "error": "No session!" });
    }

}