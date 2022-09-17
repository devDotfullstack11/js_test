var express = require('express'),
  router = express.Router();

const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const { body, validationResult } = require("express-validator");



router
  .post('/add',
  body("name").isLength({ min: 3 }),
  body("cin").isLength({ min: 5 }),
  function (req, res) {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error_msg ="";
      errors.array().forEach(function (error) {
        error_msg += `${error.param}: ${error.msg}`;
      });
      res.status(400).send({
        message: error_msg
      });
      return;
     }
    const tutorial = {
      name: req.body.name,
      cin: req.body.cin
    };
   
    Product.create(tutorial)
      .then(data => {
        res.json({ status: 1, data: data, message: "Success!" });
      })
      .catch(err => {
        res.json({ status: 0, message: "Some Error Occured!" });
      });
  });

  router
  .post('/list', function (req, res) {
    // Validate request
    
    Product.findAll()
      .then(data => {
        res.json({ status: 1, results: data, message: "Success!" });
      })
      .catch(err => {
        res.json({ status: 0, message: "Some Error Occured!" });
      });
  })


  router.get(
    "/edit/(:id)",
    function (req, res, next) {
      Product.findOne({where:{id:req.params.id}})
      .then(data => {
        res.json({ status: 1, product: data, message: "Success!" });
      })
      .catch(err => {
        res.json({ status: 0, message: "Some Error Occured!" });
      });
    }
  );


  router.post(
    "/update/:id",
    body("name").isLength({ min: 3 }),
  body("cin").isLength({ min: 5 }),
    function (req, res, next) {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error_msg ="";
      errors.array().forEach(function (error) {
        error_msg += `${error.param}: ${error.msg}`;
      });
      res.status(400).send({
        message: error_msg
      });
      return;
     }
     const product = {
      name: req.body.name,
      cin: req.body.cin
    };

     Product.update(
      product,
      {where:{id:req.params.id}})
      .then(data => {
        res.json({ status: 1,  message: "Success!" });
      })
      .catch(err => {
        res.json({ status: 0, message: "Some Error Occured!" });
      });

    }
  );


  router.post(
    "/delete",
    async function (req, res, next) {
     let product = await Product.findOne({where:{id:req.body.id}})
     if(product instanceof Product){
       product.destroy();
       res.json({ status: 1,  message: "Success!" });
     } else {
      res.json({ status: 0, message: "Some Error Occured!" });
     }
     
    }
  );


module.exports = router;