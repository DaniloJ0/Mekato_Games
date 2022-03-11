const express = require('express')
const router = express.Router()
const data = require('./data')
const mission_objectives = require(data).mission_objectives

//Get
router.get('/getMissionObjectives', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission_objective = mission_objectives.find(mission_objective => mission_objective.id === +id);
        if(mission_objective){
            res.status(200).json(mission_objective);
        }else{
            res.status(404).json({msg: 'Mission objective not found'});
        }
    }else{
        res.json(mission_objectives);
    }   
});


// Delete
router.delete('/deleteMissionObjectives', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission_objective = mission_objectives.find(mission_objective => mission_objective.id === +id);
        if(mission_objective){
            const index = mission_objectives.indexOf(mission_objective);
            mission_objective.splice(index, 1);
            res.status(200).json(mission_objective);
        }else{
            res.status(404).json({msg: 'Mission objective not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});


//Patch
router.patch('/updateMissionObjectives', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission_objective = mission_objectives.find(mission_objective => mission_objective.id === +id);
        if(mission_objective){
            const {name, description, count, mission} = req.body;
            if(name){
                mission_objective.name = name;
            }
            if(description){
                mission_objective.description = description;
            }
            if(count){
                mission_objective.count = count;
            }
            if(mission){
                res.status(400).send('Mission objective cannot be updated');
            }
            res.status(200).json(mission_objective);
        }else{
            res.status(404).json({msg: 'Mission objective not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

module.exports = router;