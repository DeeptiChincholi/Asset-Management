const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AssetModel = require("./models/AssetDetailss")
const RegisterModel = require("./models/RegisterDetails")
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json()) //transfer data in json format from frontend to backend
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], // Allow GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any headers frontend sends
  }));
mongoose.connect("mongodb://localhost:27017/RilFormRecords");


app.post('/assets',(req,res)=>{
    AssetModel.create(req.body).then(assets => res.json(assets)).catch(err => res.json(err))
})

app.post('/register',(req,res)=>{
    RegisterModel.create(req.body).then(register => res.status(200).json(register)).catch(err=>res.status(400).json(err))
})
app.post('/', async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await RegisterModel.findOne({email});
        if(!user)
        {
            return res.status(300).json({message : "Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message : "Invalid Password"});
        }
        return res.status(200).json(user.firstName);


    }catch(err){
        return res.status(500).json({error : "Error"});
    }
})
app.get('/assetDetails', async (req, res) => {
    try {
        const assets = await AssetModel.find();
        return res.status(200).json(assets);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching asset details" });
    }
});
app.get('/profile', async (req, res) => {
    try {
        
        const email = req.query.email;
        const profile = await RegisterModel.findOne({email});
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching asset details" });
    }
});
// Assuming you have a route like this in your Express app
app.post('/profile', async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Validate inputs
      if (!email || !newPassword) {
        return res.status(400).json({ error: "Email and newPassword are required" });
      }
  
      // Find user by email (assuming you have a user model like RegisterModel)
      const user = await RegisterModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Update user's password
      user.password = newPassword;
      await user.save();
  
      // Optionally, you can send a success response
      return res.status(200).json({ message: "Password updated successfully" });
  
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
app.listen(5000,()=>{
    console.log("server is running")
})
