// models
const User = require('../models/user');
const Product = require('../models/product');

exports.addProduct = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];

    if (!session) return res.sendStatus(401);

    User.findOne({ session, 'admin': true })
        .then((response) => {

            if (!response) return res.sendStatus(401);

            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.price;
            const category = req.body.category;

            let path;
            if (req.body.path && req.body.path != "" && req.body.path != " ") {
                path = req.body.path;
            }
            else (path = "NoImage.png")

            const discount = req.body.discount || 0;
            const product = new Product();
            product.name = name;
            product.description = description;
            product.price = price;
            product.category = category;
            product.path = path;
            product.discount = discount;

            product.save().then(response => { return res.status(201).send(response) });

        })
        .catch((error) => { res.status(422).json({ "error": "Data cannot be processed!" }) })
}

exports.deleteProduct = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];
    if (!session) return res.sendStatus(401);

    User.findOne({ session, 'admin': true })
        .then((response) => {

            if (!response) return res.sendStatus(401);

            let _id = req.params.productId;

            Product.findByIdAndDelete({ _id })
                .then((resp) => {
                    if (resp) {

                        const _id = req.params.productId;

                        User.find().then(users => {

                            let userContainer = [];

                            users.forEach(oneUser => {
                                userContainer.push(oneUser);
                            })

                            userContainer.forEach(oneUser => {

                                let userId = oneUser._id;

                                var filteredWishList = oneUser.wishList.filter(function (value, index, arr) {
                                    return value._id != _id;
                                });

                                User.updateOne({ _id: userId }, { $set: { wishList: filteredWishList } }).then(response => { })
                                    .catch(error => { return res.status(500).json({ "message": "Unexpected error!" }) })
                            });

                            
                        })
                        console.log("\tWishList update for all users is done.\n\tIf the product existed in any wishlist, it is now deleted.")
                        return res.json({ "message": 'Deleted' })
                    }
                    return res.status(404).json({ "error": "Product not found!" })
                })
                .catch(() => { return res.status(404).json({ "error": "Product not found!" }) })
        })
        .catch(() => { return res.status(500) })
}

exports.modifyProduct = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];
    if (!session) return res.sendStatus(401);

    User.findOne({ session, 'admin': true })
        .then((response) => {

            if (!response) return res.sendStatus(401);

            let _id = req.params.productId;

            Product.findOne({ _id })
                .then((product) => {

                    var name = req.body.name || product.name;
                    var description = req.body.description || product.description;
                    var price = req.body.price || product.price;
                    var category = req.body.category || product.category;
                    var path = req.body.path || "NoImage.png";
                    var discount = req.body.discount || product.discount;
                    var quantity = req.body.quantity || product.quantity;

                    Product.updateOne({ _id }, { $set: { name, category, description, price, path, discount, quantity } })
                        .then(() => { Product.findOne({ _id }).then((result => { res.send(result) })) })
                        .catch(() => { return res.sendStatus(404) })

                })
                .catch(() => {
                    return res.sendStatus(404);
                })
        })
        .catch(() => {
            return res.status(500).send({ "error": "There might be a problem. Please, try again." });
        })
}