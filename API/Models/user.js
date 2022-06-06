const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
    phonenumber: {
      type: String,
    },
    address: {
        type: String,
      },
});

//the model will represent the db in mongoDB and have it to our schema that we created here
const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;
