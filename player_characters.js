const express = require('express');
const router = express.Router();
const data = require('./data');


//Player Character Creation - POST
router.post('/', async (req,res)=>{
    const{...player_character}=req.body;
    data.player_characters.push(player_character);
    res.send('Player Character Created Successfully!');
});

//Get Player Characters - GET
router.get('/', async (req,res)=>{
    res.send(JSON.stringify(data.player_characters));
});

//Get Player Character by ID - GET
router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    const player_character = data.player_characters.find(player_character=> player_character.id === id);
    res.send(JSON.stringify(player_character));
});

//Update Player Character by ID - PUT
router.put('/:id', async (req,res)=>{
    const {id}=req.params;
    const{...player_character}=req.body;
    const index = data.player_characters.findIndex(player_character=> player_character.id === id);
    if(index!==-1){
        data.player_characters[index] = player_character;
        res.send('Player Character Updated Successfully!');
    }else{
        res.send('This Player Character ID doesn`t exist.');
    }
});

//Delete Player Character by ID - DELETE
router.delete('/:id', async (req,res)=>{
    const {id}=req.params;
    const index = data.player_characters.findIndex(player_character=> player_character.id === id);
    if(index!==-1){
        data.player_characters.splice(index,1);
        res.send('Player Character Deleted Successfully!');
    }else{
        res.send('This Player Character ID doesn`t exist.');
    }
});

module.exports = router;