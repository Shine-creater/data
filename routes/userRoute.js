const express = require("express")
const mongoose = require("mongoose"); // Only declare mongoose once
const app = express();
const User = require("./models/userModel")
const router = express.Router();

// POST route to add a user
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// GET route to check API status
router.get("/", async (req, res) => {
    try{
    const showAll = await User.find();
    res.status(201).json(showAll);
     } catch(error){
  console.log(error)
  res.send(400).json({error:error.meassage});
    }
});


// get single user

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
    const singleUser = await User.findById({_id: id});
    res.status(201).json(singleUser);
     } catch(error){
  console.log(error)
  res.send(400).json({error:error.meassage});
    }
});

// delete

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
    const singleUser = await User.findByIdAndDelete({_id: id});
    res.status(200).json(singleUser);
     } catch(error){
  console.log(error)
  res.send(400).json({error:error.meassage});
    }
});

//put/patch
router.patch("/:id", async(req,res)=>{
    const {id} = req.params;
    const {name,eamil,age} = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.status(200).json(updateUser);
    } catch(error){
        res.status(400).json({error:error.meassage});
    }
})





module.exports = router;
