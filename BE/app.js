const bodyParser = require('body-parser');
const express = require('express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const payment = require("./routes/paymentRoute");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order)
app.use("/api/v1", payment);

// Middleware for errors
app.use(errorMiddleware)


module.exports = app;