'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VariantSchema = new Schema({
	position: {
		type: Number
	},
	sku: {
		type: String
	},
	requiresShipping: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

var ProductSchema = new Schema(
	{
		productCode: {
			type: String
		},
		title: {
			type: String,
			default: '',
			trim: true,
			required: 'Product title can not be blank.',
			max: 'Product title max length validaion.'
		},
		description: {
			type: String,
			default: '',
			trim: true
		},
		size: {
			type: String,
			default: '',
		},
		sku: {
			type: String,
			default: '',
		},
		category: {
			type: String,
			default: '',
		},
		additional_information: {
			type: String,
			default: '',
		},
		reviews: {
			type: Array,
			default: [],
		},
		storeId: {
			type: Schema.ObjectId
		},
		productType: {
			type: String
		},
		vendor: {
			type: String
		},
		variants: [VariantSchema],
		published: {
			type: Boolean
		},
		publishedAt: {
			type: Date,
			default: Date.now // not required
		},
		created_at: {
			type: Date,
			default: Date.now
		},
		updated_at: {
			type: Date
		}
	},
	{ collection: 'product' }
);

module.exports = exports = mongoose.model('Product', ProductSchema);
