'use strict';

var passport = require('passport'),
	// users = require('../controllers/users.server.controller'),
	products = require('../controllers/product.server.controller')
	;
const { sendSuccessResponse, sendBadResponse } = require('../../helpers')
const express = require('express');

const router = express.Router();


module.exports = function (app) {

	const testGetRoute = function (req, res) {
		console.log("Request Check ", req.route.method);
		debug("Default Index Home Route Called");
		sendBadResponse(res, null, "Products not found!!")
	}

	router.route('/list').get(products.getAllList);
	router.route('/show/{id}').get(products.getDetailById);
	// app.route('/create').get(testGetRoute);


	// app.route('/products')
	// 	.get(products.getAllProducts)
	// 	.post(products.createProduct);

	// app.route('/products/:productId')
	// 	.get(products.getProduct)
	// 	.put(products.updateProduct)
	// 	.delete(products.deleteProduct);

	// app.param('productId', products.productById);
};
