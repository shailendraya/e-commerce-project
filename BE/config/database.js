const mongoose = require("mongoose");

const connectDatabse = async () => {
    let db ;
    const connect = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then((data) => {
        db = data;
        console.log(`Mongodb connected with server: ${data.connection.host}`, `${process.env.DB_URI}`)
    })
    return connect;
}


module.exports = connectDatabse;