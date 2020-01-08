'use strict';
const debug = require('debug')('express:product.controller');

const { sendBadResponse, sendSuccessResponse, makeResponse, makeError } = require('../../helpers');

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	// Product = mongoose.model('Product');
	Product = require('../models/product.server.model');



/** get all product list */
exports.getAllList = async (req, res) => {
	var mysort = { created_at: -1 };
	var allProducts = await Product.find({}).sort(mysort);
	console.log("All Products");
	if (allProducts.length == 0) {
		sendBadResponse(res, null, "Products not found!!")
	}
	sendSuccessResponse(res, allProducts  /* null */, "Products successfully retrived!!!")
}


exports.getAllProducts = function (req, res) {
	Product.find({ storeId: req.user.store }, function (err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(products);
		}
	});
};

/** create prodcut with validation */
/** remian valdiation for product uploading */
exports.createProduct = function (req, res) {
	console.log("in Create", req.body);
	// sendSuccessResponse(res, req.body, "Created Datas")
	var product = new Product(req.body);
	// product.storeId = req.user.store;
	product.save(function (err) {
		if (err) {
			console.log("Error Message", err);
			res.json(makeError(null, errorHandler.getErrorMessage(err), 400)).end();
		} else {
			res.json(makeResponse(product, "Product Successfully created! NEw", 201)).end();
		}
	});
};

exports.getDetailById = async function (req, res) {
	var id = req.params.id

	/** Get Product details by Object Id */
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return sendBadResponse(res, null, "Product details not found!", 400)
		// return res.status(400).send({
		// 	message: ''
		// });
	}
	var prodcut = await Product.findById(id)

	return sendSuccessResponse(res, prodcut, "Product retrive successfully.", 200)

	// return res.json(prodcut);

	/**  */
	// Product.findById(id).exec(function (err, product) {
	// 	if (err) {
	// 		return next(err);
	// 	}

	// 	if (!product) {
	// 		``
	// 		return res.status(404).send({
	// 			message: 'Category not found'
	// 		});
	// 	}

	// 	req.product = product;
	// 	next();
	// });
};

exports.getProduct = function (req, res) {
	res.json(req.product);
};

exports.updateProduct = function (req, res, next, id) {


	var product = req.product;
	product = _.extend(product, req.body);

	product.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

exports.deleteProduct = function (req, res) {
	var product = req.product;
	product.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};

exports.productById = function (req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Product is invalid'
		});
	}

	Product.findById(id).exec(function (err, product) {
		if (err) {
			return next(err);
		}

		if (!product) {
			``
			return res.status(404).send({
				message: 'Category not found'
			});
		}

		req.product = product;
		next();
	});
};