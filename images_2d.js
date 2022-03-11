const express = require('express')
const router = express.Router()
const images_2d = require('./data').images_2d

//Get
router.get('/getImages_2d', (req, res) => {
    const id = req.query.id;
    if(id){
        const image_2d = images_2d.find(image_2d => image_2d.id === +id);
        if(image_2d){
            res.status(200).json(image_2d);
        }else{
            res.status(404).json({msg: 'Image 2d not found'});
        }
    }else{
        res.json(images_2d);
    }
});

//Post 
router.post('/images_2d', (req, res) => {
    const {address} = req.body;
    if(!address){
        res.status(400).send('Missing fields');
    }else{
        const newImage_2d = {
            id: images_2d.length + 1,
            address
        };
        images_2d.push(newImage_2d);
        res.status(200).json(newImage_2d);
    }
});


// Delete
router.delete('/deleteImages_3d', (req, res) => {
    const id = req.query.id;
    if(id){
        const image_2d = images_2d.find(image_2d => image_2d.id === +id);
        if(image_2d){
            const index = images_2d.indexOf(image_2d);
            image_2d.splice(index, 1);
            res.status(200).json(image_2d);
        }else{
            res.status(404).json({msg: 'Image 2d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

//Patch
router.patch('/updateImages_2d', (req, res) => {
    const id = req.query.id;
    if(id){
        const image_2d = images_2d.find(image_2d => image_2d.id === +id);
        if(image_2d){
            const {address} = req.body;
            if(address){
                image_2d.address = address;
                res.status(200).json(image_2d);
            }else{
                res.status(400).send('Missing fields');
            }
        }else{
            res.status(404).json({msg: 'Image 2d not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});


module.exports = router;