const express = require('express')
const router = express.Router()
//const data = require('./data')
const models_3d = require('./data').models_3d

//Get
router.get('/getModels_3d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_3d = models_3d.find(model_3d => model_3d.id === +id);
        if(model_3d){
            res.status(200).json(model_3d);
        }else{
            res.status(404).json({msg: 'Model 3d not found'});
        }
    }else{
        res.json(models_3d);
    }
});

//Post 
router.post('/models_3d', (req, res) => {
    const {address} = req.body;
    if(!address){
        res.status(400).send('Missing fields');
    }else{
        const newModel_3d = {
            id: models_3d.length + 1,
            address
        };
        models_3d.push(newModel_3d);
        res.status(200).json(newModel_3d);
    }
});


// Delete
router.delete('/deleteModels_3d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_3d = models_3d.find(model_3d => model_3d.id === +id);
        if(model_3d){
            const index = models_3d.indexOf(model_3d);
            model_3d.splice(index, 1);
            res.status(200).json(model_3d);
        }else{
            res.status(404).json({msg: 'Model 3d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

//Patch
router.patch('/updateModels_3d', (req, res) => {
    const id = req.query.id;
    if(id){
        const model_3d = models_3d.find(model_3d => model_3d.id === +id);
        if(model_3d){
            const {address} = req.body;
            if(address){
                model_3d.address = address;
                res.status(200).json(model_3d);
            }else{
                res.status(400).send('Missing fields');
            }
        }else{
            res.status(404).json({msg: 'Model 3d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});


module.exports = router;