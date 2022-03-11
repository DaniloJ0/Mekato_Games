const express = require('express')
const router = express.Router()
const data = require('./data')
//Get
router.get('/', async (req,res)=>{
        res.status(200).json(data.characters)
});

//Post 

// Delete


//Patch


module.exports = router;