
const express = require("express");
const router = express();


const userRoute = require("./User");

router.use("/user", userRoute);

module.exports = router;
