const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./Models/user");
const { response } = require("express");
const bodyParser = require("body-parser");
app.use(bodyParser());
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://basselAreeba:areeba123@cluster0.cbu2s.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/users", async (req, res) => {

  const resultSearch = await user.find({});
  console.log(mongoose.connection.readyState);
    res.json(resultSearch);
});

app.post("/addUser", async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;


    const newUser = await new user({
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      address: address,

    });
    console.log(firstname);
        await newUser.save();
  });
  
  app.post('/updateUser/:userId', async (req, res) => {
      console.log(req.body)
    const updateUser = await user.findByIdAndUpdate(req.params.userId,req.body)
  });

  app.delete('/deleteUser/:userId', async(req,res) => {
      console.log(req.params.userId)
    const deleteUser = await user.findByIdAndDelete(req.params.userId)
    console.log(deleteUser);

})

app.listen(8888, () => {
  console.log("API server is ON !");
});
