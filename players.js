const express = require('express');
const router = express.Router();
const data = require('./data');


//Player Creation - POST
router.post('/', async (req,res)=>{
    const{...player}=req.body;
    data.players.push(player);
    res.send('Player Created Successfully!');
});

//Get Players - GET
router.get('/', async (req,res)=>{
    res.send(JSON.stringify(data.players));
});

//Get Player by ID - GET
router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    const player = data.players.find(player=> player.id === id);
    res.send(JSON.stringify(player));
});

//Update Player by ID - PUT
router.put('/:id', async (req,res)=>{
    const {id}=req.params;
    const{...player}=req.body;
    const index = data.players.findIndex(player=> player.id === id);
    if(index!==-1){
        data.players[index] = player;
        res.send('Player Updated Successfully!');
    }else{
        res.send('This Player ID doesn`t exist.');
    }
});

//Delete Player by ID - DELETE
router.delete('/:id', async (req,res)=>{
    const {id}=req.params;
    const index = data.players.findIndex(player=> player.id === id);
    if(index!==-1){
        data.players.splice(index,1);
        res.send('Player Deleted Successfully!');
    }else{
        res.send('This Player ID doesn`t exist.');
    }
});

//Patch
router.patch('/players', (req, res) => {
    const id = req.query.id;
    if(id){
        const players = players.find(player => player.id === +id);
        if(players){
            const {name,password, username} = req.body;
            if(name){
                players.name = name;
                if (players.password===password) {
                    players.last_login =Date.now();
                    res.status(200).json(players);
                }else{
                    res.status(400).send('Password failed');
                }
            }else{
                res.status(400).send('Missing fields');
            }
        }else{
            res.status(404).json({msg: 'player not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

module.exports = router;