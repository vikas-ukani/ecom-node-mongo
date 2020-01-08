

// require the Joi module
const Joi = require('joi');

const validatData = (req) => {

    // fetch the request data
    const input = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

        title: Joi.string().max(10).required(),
        size: Joi.string().max(10).required(),

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),

        // birthday is not required
        // birthday must be a valid ISO-8601 date
        // dates before Jan 1, 2014 are not allowed
        birthday: Joi.date().max('1-1-2004').iso(),

    });

    // validate the request input against the schema
    Joi.validate(input, schema, (err, value) => {

        // create a random number as id
        const id = Math.ceil(Math.random() * 9999999);

        if (err) {

            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: input
            });
        } else {
            // send a success response if validation passes
            // attach the random ID to the data response
            res.json({
                status: 'success',
                message: 'User created successfully',
                data: Object.assign({ id }, value)
            });
        }

    });


}