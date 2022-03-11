const express = require('express');
const router = express.Router();
const data = require('./data');


//Character Stats Creation - POST
router.post('/', (req, res) => {
    const {attribute_1, attribute_2, attribute_3} = req.body;
    if(!attribute_1 || !attribute_2 || !attribute_3){
        res.status(400).send('Missing fields');
    }else{
        const newItem = {
            id: items.length + 1,
            attribute_1,
            attribute_2,
            attribute_3,
            life: parseInt(attribute_1)*20,
            power: (parseInt(attribute_1)*10) + parseInt(attribute_2)*25,
            magic: parseInt(attribute_3)*100,
        };
        data.characters_stats.push(newItem);
        res.status(201).json(newItem);
    }
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
router.patch('/update_stats', (req, res) => {
    const id=req.params;
    if(id){
        const characters_stat = data.characters_stats.find(characters_stat => characters_stat.id === +id);
        if(characters_stat){
            const {life, power, magic, attribute_1, attribute_2, attribute_3} = req.body;
            if(life){
                res.status(400).send('Life cannot be updated');
            }
            if(power){
                res.status(400).send('Power cannot be updated');
            }
            if(magic){
                res.status(400).send('Magic cannot be updated');
            }
            if(attribute_1){
                characters_stat.attribute_1 = attribute_1;
                characters_stat.life = parseInt(attribute_1)*20;
            }
            if(attribute_2){
                characters_stat.attribute_2 = attribute_2;
                characters_stat.power = (parseInt(attribute_1)*10) + parseInt(attribute_2)*25;
            }
            if(attribute_3){
                characters_stat.attribute_3 = attribute_3;
                characters_stat.magic = parseInt(attribute_3)*100;
            }
            res.status(200).json(characters_stat);
        }else{
            res.status(404).json({msg: 'Character Stats not found'});
        }
    }else{
        res.status(400).send('No id provided');
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