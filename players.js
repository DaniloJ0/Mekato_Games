const express = require('express')
const router = express.Router()
const players = require('./data').players

//Get
router.get('/getPlayers', async (req,res)=>{
        res.status(200).json(players)
});


//User - POST
router.post('/', (req, res) => {
    const {id} = req.body;
    if(!id){
        res.status(400).send('Missing fields');
    }else{
        const newModel_2d = {
            id: models_2d.length + 1,
            last_login:Date.now(),
            password: id.password,
            username: id.username,
        };
        models_2d.push(newModel_2d);
        res.status(200).json(newModel_2d);
    }
});

//Update by ID - PUT
router.put('/:id', async (req,res)=>{
    const {id}=req.params;
    const{...user}=req.body;
    const index = data.characters.findIndex(user=> user.id === id);
    if(index!==-1){
        data.characters[index] = user;
        console.log(data.users);
        res.send('Usuario Actualizado Exitosamente!');
    }else{
        res.send('Este usuario no existe.');
    }
});

//Delete by ID - DELETE
router.delete('/user/:id', async (req,res)=>{
    const {id}=req.params;
    const index = data.characters.findIndex(user=> user.id === id);
    if(index!==-1){
        data.characters.splice(index,1);
        console.log(data.characters);
        res.send('Usuario Eliminado Exitosamente!');
    }else{
        res.send('Este usuario no existe.');
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