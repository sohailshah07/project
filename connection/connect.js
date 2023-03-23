const mongoose = require("mongoose");
const mongo_url = 'mongodb+srv://sohailshah:sohailss4@project.jqbvdc5.mongodb.net/?retryWrites=true&w=majority'
var mongoDbconnection = async function () {
    mongoose.connect(mongo_url, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log("db connected .... ")
        })
};

// mongodb+srv://SohailShah:sohailss4@project.jqbvdc5.mongodb.net/?retryWrites=true&w=majority

module.exports = {
    mongoDbconnection: mongoDbconnection
};