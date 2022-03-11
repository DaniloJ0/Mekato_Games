const express = require('express')
const router = express.Router()
const models_2d = require('./data').models_2d

//Get
router.get('/getModels_2d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_2d = models_2d.find(model_2d => model_2d.id === +id);
        if(model_2d){
            res.status(200).json(model_2d);
        }else{
            res.status(404).json({msg: 'Model 2d not found'});
        }
    }else{
        res.json(models_2d);
    }
});

//Post 
router.post('/models_2d', (req, res) => {
    const {address} = req.body;
    if(!address){
        res.status(400).send('Missing fields');
    }else{
        const newModel_2d = {
            id: models_2d.length + 1,
            address
        };
        models_2d.push(newModel_2d);
        res.status(200).json(newModel_2d);
    }
});


// Delete
router.delete('/deleteModels_3d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_2d = models_2d.find(model_3d => model_3d.id === +id);
        if(model_2d){
            const index = models_2d.indexOf(model_2d);
            model_2d.splice(index, 1);
            res.status(200).json(model_2d);
        }else{
            res.status(404).json({msg: 'Model 2d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

//Patch
router.patch('/updateModels_2d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_2d = models_2d.find(model_2d => model_2d.id === +id);
        if(model_2d){
            const {address} = req.body;
            if(address){
                model_2d.address = address;
                res.status(200).json(model_2d);
            }else{
                res.status(400).send('Missing fields');
            }
        }else{
            res.status(404).json({msg: 'Model 2d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});


module.exports = router;