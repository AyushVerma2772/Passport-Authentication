//* Step 1. create a userSchema (without username and password)
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true }
})

//* Step 2. add passportLocalMongoose plugin to userSchema. So that it can add username and password to userSchema
userSchema.plugin(passportLocalMongoose);

//* Step 3. create a UserModel 
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
