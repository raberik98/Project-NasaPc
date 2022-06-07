const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: Number,
    status: String,
    last_name: String,
    first_name: String,
    birthday_place: String,
    birthday: String,
    email: String,
    phone_number: String,
    billing_address: String,
    shipping_address: String,
    total_price: Number,
    payment_method: String,
    items: [
        {
            product: { type: Object, required: true },
        }
    ]
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema, 'orders');
