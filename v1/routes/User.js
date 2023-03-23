const express = require('express');
const router = express.Router();

const userControllers = require("../controller").user
/*
  ON BOARDING
*/
router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.post('/createItem', userControllers.addItem)
router.get('/listItem', userControllers.listItem)
router.post('/sale', userControllers.sale)


module.exports = router;
