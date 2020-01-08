const debug = require('debug')('express:routes');

const express = require('express');
const router = express.Router();
const { sendSuccessResponse, sendBadResponse } = require('../helpers')

// const productsRuter = require('../app/routes/products.server.routes')

var ProductsController = require('../app/controllers/product.server.controller')

/**
* Authentication Middleware check here.
*/
function isAuthenticated(req, res, next) {

    if (req.user && req.isAuthenticated()) {
        debug("Authenticate Success");
        return next();
    }
    return sendBadResponse(res, null, "Unauthorized User, try login!")
    // return res.json({ success: false });
}

const defaultIndex = function (req, res) {

    var data = [
        {
            name: " Vikas Ukani"
        }
    ]

    return sendSuccessResponse(res, data, "sendBadResponse Response work")
}

const testGetRoute = function (req, res) {
    console.log("Request Check ", req.route.method);
    debug("Default Index Home Route Called");
    return sendBadResponse(res, null, "sendBadResponse Response work")
}

const testPOSTRoute = function (req, res) {
    console.log("Request Check ", req.route.method);
    return sendBadResponse(res, null, "POST ROUTE CALLED!!")
}

const profileRoutes = (req, res) => {
    return sendBadResponse(res, null, "profileRoutes Route called")
}

// ------------------------------------- ROUTER START -------------------------------

router.get('/', defaultIndex);

router.route('/test')
    .get(testGetRoute)
    .post(testPOSTRoute);

/** ----------------------------------  * *  MODULES ROUTES START  * *  ---------------------------- */

router.use('/profile', isAuthenticated, profileRoutes);

/** products urls */
// router.use('/products/list', /* isAuthenticated, */ productsRuter)
router.route('/products-list').get(ProductsController.getAllList)
router.route('/products-show/:id').get(ProductsController.getDetailById)
router.route('/products-create').get(ProductsController.createProduct)

/** ----------------------------------  * *  MODULES ROUTES END  * *  ---------------------------- */

// ------------------------------------- ROUTER END -------------------------------

router.use(function (req, res, next) {
    return sendBadResponse(res, null, 'Route ' + req.url + ' Not found.')
    // return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

router.use(function (err, req, res, next) {
    debug("ERRROR", err);
    return sendBadResponse(res, null, err.getMessage, 500)
    // return res.status(500).send({ error: err });
});




module.exports = router;
