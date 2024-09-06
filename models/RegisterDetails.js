const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Define the schema
const RegisterSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String 
}, {
    versionKey: false
});

// // Pre-save hook to hash the password
RegisterSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

// Create the model
const RegisterModel = mongoose.model("register", RegisterSchema);

// Export the model
module.exports = RegisterModel;
