const mongoose = { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autopopulate = require('mongoose-autopopulate');

const ___Schema = Schema({

});
___Schema.plugin(uniqueValidator, { message: '{PATH} se ha duplicado' });
___Schema.plugin(autopopulate)

const ___Model = mongoose.model('___', ___Schema);

module.exports.___Paths = ___Paths;
module.exports = ___Model;