const mongoose = { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autopopulate = require('mongoose-autopopulate');

const UserSchema = Schema({

});

UserSchema.plugin(uniqueValidator, { message: '{PATH} se ha duplicado' });
UserSchema.plugin(autopopulate)

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;