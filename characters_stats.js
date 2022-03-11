const express = require('express');
const router = express.Router();
const data = require('./data');


//Character Stats Creation - POST
router.post('/', async (req,res)=>{
    const{...characters_stat}=req.body;
    data.characters_stats.push(characters_stat);
    res.send('Character Stats Created Successfully!');
});

//Get Character Stats - GET
router.get('/', async (req,res)=>{
    res.send(JSON.stringify(data.characters_stats));
});

//Get Character Stats by ID - GET
router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    const characters_stat = data.characters_stats.find(characters_stat=> characters_stat.id === id);
    res.send(JSON.stringify(characters_stat));
});

//Update Character Stats by ID - PUT
router.put('/:id', async (req,res)=>{
    const {id}=req.params;
    const{...characters_stat}=req.body;
    const index = data.characters_stats.findIndex(characters_stat=> characters_stat.id === id);
    if(index!==-1){
        data.characters_stats[index] = characters_stat;
        res.send('Character Stats Updated Successfully!');
    }else{
        res.send('This Character Stats ID doesn`t exist.');
    }
});

//Delete Character Stats by ID - DELETE
router.delete('/:id', async (req,res)=>{
    const {id}=req.params;
    const index = data.characters_stats.findIndex(characters_stat=> characters_stat.id === id);
    if(index!==-1){
        data.characters_stats.splice(index,1);
        res.send('Character Stats Deleted Successfully!');
    }else{
        res.send('This Character Stats ID doesn`t exist.');
    }
});

module.exports = router;