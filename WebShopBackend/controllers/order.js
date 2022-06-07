// models
const Order = require('../models/order');
const User = require('../models/user');

// nodemailer to send emails
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// mongodb for generating ObjectId
const mongodb = require('mongodb');

// custom id maker for generating a random order id/name
const makeid = require('../util/makeid.js');

// FileSystem for file operations
const fs = require('fs');

// instantiate nodemailer-sendgrid
const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY }));

// custom price converter ---> 16900 -> 16.900 | 169000 -> 169.000
function priceConverter(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// base64 encode for encoding/sending images through email
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}
  
exports.placeOrder = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];
    const id = makeid(6).toUpperCase();

    if (!session) {

        Order.insertMany({ id, 'created_at': Date.now(), 'status': 'Processing...', ...req.body })
            .then(() => {
                
                let = htmlProducts = '<tr><td class="image">Image</td><td>Product</td><td>Total</td></tr>';
                let imagePaths = [];
                let index = 1;
                req.body.items.forEach(item => {
                    imagePaths.push(item.product.path);
                    if (index % 2) htmlProducts += '<tr class="strip"><td class="image"><img src="cid:imagecid' + index + '"></td><td>' + 1 + 'x ' + item.product.name + '</td> <td>' + priceConverter(item.product.price * 1) + ' Ft</td> </tr>';
                    else htmlProducts += '<tr> <td class="image"><img src="cid:imagecid' + index + '"></td><td>' + 1 + 'x ' + item.product.name + '</td> <td>' + priceConverter(item.product.price * 1) + ' Ft</td> </tr>';
                    index++;
                });
                htmlProducts += '<tr class="total"> <td></td> <td><b>Total</b></td> <td><b>' + priceConverter(req.body.total_price) + ' Ft</b></td> </tr>'

                let files = [];
                index = 1;
                imagePaths.forEach(imagePath => {
                    files.push({
                        'filename': imagePath,
                        'content': base64_encode('../WebShop/WebShopFrontend/public/image/' + imagePath),
                        'type': 'image/jpg',
                        'cid': 'imagecid' + index,
                        'disposition': 'inline',
                    });
                    index++;
                });

                transport.sendMail({
                    from: 'tamas.robert1@students.jedlik.eu',
                    to: req.body.email,
                    subject: 'Order placed!',
                    html: '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <style> .container { background-color: #1d1d30; width: 800px; color: #fff; margin: 0 auto 0 auto; } h1,h3 { text-align: center; } h1 { padding-top: 30px; } .pt { padding-top: 30px; padding-left: 40px; text-align: start; } .pb { padding-bottom: 40px; } span { display: block; padding: 3px 5px 3px 40px; color: #fff; } table { width: 100%; padding: 0px 30px 30px 30px; margin: 0 auto 0 auto; } table tr { background-color: #151522; } table td { text-align: center; padding: 5px; } img { width: 48px; height: 48px; } .image { width: 48px; padding: 0; margin: 0; } .strip {background-color: #181827;} .total{background-color: #292945;} </style> </head> <body> <div class="container"> <h1>Your order has been recieved by us!</h1> <h3>Dear ' + req.body.last_name + ' ' + req.body.first_name + '!</h3> <span>Thank you for using our webshop!</span> <span>If you chosed pre-payment. You shall transfer the purchase price on the basis of the fee request sent by the following e-mail, writing the exact order ID in a notice: <b>' + id + '</b> Our bank account number: <b>12345678-12345678-12345678</b> Owner: <b>NasaPC</b> Important! If you have not received a fee request, please contact our customer service team before making a transfer.</span> <h3>Your order ID: ' + id + '</h3> <h3 class="pt">Personal information:</h3> <table> <tr> <td>Customer:</td> <td>' + req.body.last_name + ' ' + req.body.first_name + '</td> </tr> <tr class="strip"> <td>Email:</td> <td>' + req.body.email + '</td> </tr> <tr> <td>Contact phone number:</td> <td> ' + req.body.phone_number + ' </td> </tr> <tr class="strip"> <td>Billing address:</td> <td>' + req.body.billing_address + '</td> </tr> <tr> <td>Ship-to Address:</td> <td>' + req.body.shipping_address + '</td> </tr> </table> <h3 class="pt">Ordered products:</h3> <table class="products">' + htmlProducts + '</table> <span>Payment method: <b>' + (req.body.payment_method).replace(/_/g," ") + '</b></span> <span>Order date: <b>' + (Date(req.body.created_at)) + '</b></div> </body> </html>',
                    attachments: files
                });
                return res.status(200).json({ "message": "Order placed!" })
            })
            .catch(err => res.send(err));

    } else {

        User.findOne({ session })
            .then((user) => {

                if (!user) {
                    Order.insertMany({ id, 'created_at': Date.now(), 'status': 'Processing...', ...req.body })
                        .then(() => { return res.status(200).json({ "message": "Order placed!" }) })
                        .catch(err => res.send(err));
                }

                Order.insertMany({ id, 'userId': new mongodb.ObjectId(user._id), 'created_at': Date.now(), 'status': 'Processing...', ...req.body })
                    .then(() => {

                        let = htmlProducts = '<tr><td class="image">Image</td><td>Product</td><td>Total</td></tr>';
                        let imagePaths = [];
                        let index = 1;
                        req.body.items.forEach(item => {
                            imagePaths.push(item.product.path);
                            if (index % 2) htmlProducts += '<tr class="strip"><td class="image"><img src="cid:imagecid' + index + '"></td><td>' + 1 + 'x ' + item.product.name + '</td> <td>' + priceConverter(item.product.price * 1) + ' Ft</td> </tr>';
                            else htmlProducts += '<tr> <td class="image"><img src="cid:imagecid' + index + '"></td><td>' + 1 + 'x ' + item.product.name + '</td> <td>' + priceConverter(item.product.price * 1) + ' Ft</td> </tr>';
                            index++;
                        });
                        htmlProducts += '<tr class="total"> <td></td> <td><b>Total</b></td> <td><b>' + priceConverter(req.body.total_price) + ' Ft</b></td> </tr>'

                        let files = [];
                        index = 1;
                        imagePaths.forEach(imagePath => {
                            files.push({
                                'filename': imagePath,
                                'content': base64_encode('../WebShop/WebShopFrontend/public/image/' + imagePath),
                                'type': 'image/jpg',
                                'cid': 'imagecid' + index,
                                'disposition': 'inline',
                            });
                            index++;
                        });

                        transport.sendMail({
                            from: 'tamas.robert1@students.jedlik.eu',
                            to: user.email,
                            subject: 'Order placed!',
                            html: '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <style> .container { background-color: #1d1d30; width: 800px; color: #fff; margin: 0 auto 0 auto; } h1,h3 { text-align: center; } h1 { padding-top: 30px; } .pt { padding-top: 30px; padding-left: 40px; text-align: start; } .pb { padding-bottom: 40px; } span { display: block; padding: 3px 5px 3px 40px; color: #fff; } table { width: 100%; padding: 0px 30px 30px 30px; margin: 0 auto 0 auto; } table tr { background-color: #151522; } table td { text-align: center; padding: 5px; } img { width: 48px; height: 48px; } .image { width: 48px; padding: 0; margin: 0; } .strip {background-color: #181827;} .total{background-color: #292945;} </style> </head> <body> <div class="container"> <h1>Your order has been recieved by us!</h1> <h3>Dear ' + req.body.last_name + ' ' + req.body.first_name + '!</h3> <span>Thank you for using our webshop!</span> <span>If you chosed pre-payment. You shall transfer the purchase price on the basis of the fee request sent by the following e-mail, writing the exact order ID in a notice: <b>' + id + '</b> Our bank account number: <b>12345678-12345678-12345678</b> Owner: <b>NasaPC</b> Important! If you have not received a fee request, please contact our customer service team before making a transfer.</span> <h3>Your order ID: ' + id + '</h3> <h3 class="pt">Personal information:</h3> <table> <tr> <td>Customer:</td> <td>' + req.body.last_name + ' ' + req.body.first_name + '</td> </tr> <tr class="strip"> <td>Email:</td> <td>' + req.body.email + '</td> </tr> <tr> <td>Contact phone number:</td> <td> ' + req.body.phone_number + ' </td> </tr> <tr class="strip"> <td>Billing address:</td> <td>' + req.body.billing_address + '</td> </tr> <tr> <td>Ship-to Address:</td> <td>' + req.body.shipping_address + '</td> </tr> </table> <h3 class="pt">Ordered products:</h3> <table class="products">' + htmlProducts + '</table> <span>Payment method: <b>' + (req.body.payment_method).replace(/_/g," ") + '</b></span> <span>Order date: <b>' + (Date(req.body.created_at)) + '</b></div> </body> </html>',
                            attachments: files
                        });

                        return res.status(200).json({ "message": "Order placed!" });
                    })
                    .catch(err => { console.log(err); res.status(500).json({ "error": "Unexpected error!" }) });
            })
            .catch(err => res.status(404).json({ "error": "User not found!" }))
    }
}

exports.getUserOrders = (req, res) => {
    const session = req.cookies['LOCAL_KEY'];
    const userId = req.params.userId;

    if (session) {
        User.findOne({ session })
            .then(user => {
                let id = user._id;
                if (!user.courier && !user.admin) {
                    console.log("logged in as user")
                    Order.find({ userId:id }).then(result => { return res.status(200).json(result) }).catch(err => res.status(404).json({ "error": "Unexpected error!" }))
                }
                else {
                    console.log("logged in as courier or admin")
                    Order.find({ userId }).then(result => { return res.status(200).json(result) }).catch(err => res.status(404).json({ "error": "User does not exist!" }))
                }
            })
            .catch(err => console.log(err))
    }
    else {
        res.status(401).json({ "error": "No session!" })
    }
}
