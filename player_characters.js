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
    const player_character = data.player_characters.find(player_character=> player_character.id === +id);
    res.send(JSON.stringify(player_character));
});

//Get Player Characters by ID - GET
router.get('/get_characters/:player', async (req,res)=>{
    const {player}=req.params;
    const player_character = data.player_characters.filter(player_character=> player_character.player === player);
    res.send(JSON.stringify(player_character));
});

//Update Player Character by ID - PUT
router.patch('/update_characters', (req, res) => {
    const id=req.params;
    if(id){
        const player_character = data.player_characters.find(player_character => player_character.id === +id);
        if(player_character){
            const {name, stats, level, title, model, player} = req.body;
            if(name){
                player_character.name = name;
            }
            if(stats){
                player_character.stats = stats;
            }
            if(level){
                player_character.level = level;
            }
            if(title){
                player_character.title = title;
            }
            if(model){
                player_character.model = model;
            }
            if(player){
                res.status(400).send('Player cannot be updated');
            }
            res.status(200).json(player_character);
        }else{
            res.status(404).json({msg: 'Player Character not found'});
        }
    }else{
        res.status(400).send('No id provided');
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