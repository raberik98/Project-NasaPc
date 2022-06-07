// express -> instantiation
const express = require("express")
const app = express()

// CORS
const cors = require('cors');

// mongoose -> schemas
const mongoose = require('mongoose');

// ensureIndex is deprecated -> moved to createIndex
mongoose.set('useCreateIndex', true);

// cookie-parser
const cookieParser = require("cookie-parser");

// .env variables - .\WebShopBackend\.env
require("dotenv").config();

// middlewares -> base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:' + process.env.FRONTEND_PORT, credentials: true }));
app.use(cookieParser());

// PayPal payment method requirements
const paypal = require("@paypal/checkout-server-sdk");
const Environment = paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));

// routes
const adminRoutes = require('./routes/admin');
const authenticationRoutes = require('./routes/authentication');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const mobileRoutes = require('./routes/mobile');

// middlewares -> routes
app.use(adminRoutes);
app.use(authenticationRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(mobileRoutes);

// mongodb base
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// middlewares -> PayPal
app.get('/api/echo/:message', (req, res) => {
  console.log("echo: " + req.params.message);
  res.send(req.params.message);
});

app.post("/create-order", async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest()
  const total = req.body.items.reduce((sum, item) => {
    return sum + storeItems.get(item.id).price * item.quantity
  }, 0)
  request.prefer("return=representation")
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "HUF",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "HUF",
              value: total,
            },
          },
        },
        items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            name: storeItem.name,
            unit_amount: {
              currency_code: "HUF",
              value: storeItem.price,
            },
            quantity: item.quantity,
          }
        }),
      },
    ],
  })

  try {
    const order = await paypalClient.execute(request)
    res.json({ id: order.result.id })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

var reqData = [];

app.get("/api/success", (req, res) => {
  res.send(reqData);
});

app.post("/api/success", (req, res) => {
  reqData = req.body;
});

// start server -> mongodb connection
mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.BACKEND_PORT, function (error) {
      if (error) throw error
      console.log("Back-end server started on port: " + process.env.BACKEND_PORT)
    })
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
