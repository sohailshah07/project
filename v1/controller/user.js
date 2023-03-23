const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Model = require("../../models");

exports.register = register;
exports.login = login;
exports.addItem = addItem;
exports.listItem = listItem;
exports.sale = sale;


async function register(req, res, next) {
  try {
    req.body.password = await bcrypt.hashSync(req.body.password, 10)
    const user = await Model.User.create(req.body);
    return res.status(201).send({
      message: 'Register successfully',
      data: user
    })
  } catch (error) {
    next(error);
  }
};

async function login(req, res, next) {
  try {
    const user = await Model.User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({
      message: 'Email not registerd !!',
      data: {}
    })
    // check password 
    const match = await bcrypt.compareSync(req.body.password, user.password)
    if (!match) return res.status(400).send({
      message: 'Incorrect password !!',
      data: {}
    })
    return res.status(200).send({
      message: 'login successful!!',
      data: user
    })
  } catch (error) {
    next(error);
  }
};

async function addItem(req, res, next) {
  try {
    const dataToSend = await Model.Item.create(req.body);
    return res.status(201).send({
      message: 'Item added successfully',
      data: dataToSend
    })
  } catch (error) {
    next(error);
  }
};

async function listItem(req, res, next) {
  try {
    const dataToSend = await Model.Item.find();
    return res.status(201).send({
      message: 'Fetched successfully',
      data: dataToSend
    })
  } catch (error) {
    next(error);
  }
};

async function sale(req, res, next) {
  try {
    if (req.body.product) await Model.Sale.create(req.body);
    const dataToSend = await Model.Sale.find().populate('product.itemId');
    return res.status(201).send({
      message: 'Success.',
      data: dataToSend
    })
  } catch (error) {
    next(error);
  }
};