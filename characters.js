const express = require('express')
const router = express.Router()
const data = require('./data')
//Get
router.get('/', async (req,res)=>{
        res.status(200).json(data.characters)
});

//Get by ID - GET
router.get('/:id', async (req,res)=>{
    const {id}=req.params;
    const charac = data.users.find(chara=> user.id === id);
    res.send(JSON.stringify(user));
});

//User - POST
router.post('/', async (req,res)=>{
    const{...user}=req.body;
    data.characters.push(user);
    res.send('Usuario Creado Exitosamente!');
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

module.exports = router;