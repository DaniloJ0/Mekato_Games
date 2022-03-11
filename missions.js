const express = require('express')
const router = express.Router()
const mission = require('./data').mission
const mission_objectives = require('./data').mission_objectives

//Get
router.get('/getMission', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission = mission.find(mission => mission.id === +id);
        if(mission){
            res.status(200).json(mission);
        }else{
            res.status(404).json({msg: 'Mission not found'});
        }
    }else{
        res.json(mission);
    }
});
//Post
router.post('/mission', (req, res) => {
    const {mission, objectives} = req.body;
    if((!mission || !objectives)||( !mission.name || !mission.description || !mission.level_reward || !mission.level_requirement )){
        res.status(400).send('Missing fields');
    }else{
        const newMission = {
            id: mission.length + 1,
            name: mission.name,
            description: mission.description,
            level_reward: mission.level_reward,
            level_requirement: mission.level_requirement,
        }
        const {name, description, count, mission} = req.body;
        if(!objectives.name || !objectives.description || !objectives.count || !newMission.id){
            res.status(400).send('Missing fields');
        }else{
            const newMissionObjective = {
                id: mission_objectives.length + 1,
                name,
                description,
                count,
                mission
            }
            mission_objectives.push(newMissionObjective);
        }
        mission.push(newMission);
        res.status(200).json(newMission);
    }
});
        


// Delete
router.delete('/deleteMission', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission = mission.find(mission => mission.id === +id);
        if(mission){
            const index = mission.indexOf(mission);
            mission.splice(index, 1);
            const mission_objective = mission_objectives.find(mission_objective => mission_objective.mission === +id);
            if(mission_objective){
                const index = mission_objectives.indexOf(mission_objective);
                mission_objectives.splice(index, 1);
            }
            res.status(200).json(mission);
        }else{
            res.status(404).json({msg: 'Mission not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

//Patch
router.patch('/updateMission/:id', (req, res) => {
    const id = req.query.id;
    if(id){
        const mission = mission.find(mission => mission.id === +id);
        if(mission){
            const {name, description, level_reward, level_requirement} = req.body;
            if(name){
                mission.name = name;
            }
            if(description){
                mission.description = description;
            }
            if(level_reward){
                mission.level_reward = level_reward;
            }
            if(level_requirement){
                mission.level_requirement = level_requirement;
            }
            res.status(200).json(mission);
        }else{
            res.status(404).json({msg: 'Mission not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

module.exports = router;