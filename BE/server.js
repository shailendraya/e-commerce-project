const app = require('./app');
const dotenv = require('dotenv');
const connectDatabse = require('./config/database');
const { Server } = require('http');
const cloudinary = require("cloudinary");

// Handling Uncaught Exception

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})
// config
// dotenv.config({path: "config/config.env"})

// set databse

connectDatabse();

// connect the cloud for file upload

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// set PORT


const server = app.listen(process.env.PORT, () => {
    console.log(`server is up and running ${process.env.PORT}`)
})

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to Unhandled promise Reject');

    server.close(() => {
        process.exit(1)
    })
})