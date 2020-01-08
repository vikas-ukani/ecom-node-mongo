'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');


var AddressSchema = new Schema({
	address1: {
		type: String
	},
	address2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	postal: {
		type: Number
	},
	country: {
		type: String
	},
	phone: {
		type: String
	}
});

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updatedAt) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};


var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true
	},
	addressBook: [AddressSchema],
	store: {
		type: Schema.ObjectId,
		ref: 'Store'
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});	


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = crypto.randomBytes(16).toString('base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);