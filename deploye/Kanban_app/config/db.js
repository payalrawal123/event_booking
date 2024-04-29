const mongoose = require("mongoose");
require("dotenv").config();
async function connectionToDb(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connect to DB");
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    connectionToDb
}