const express = require('express');
//const data = require('./data');
const router = express.Router()
const items = require('./data').items;

//Get
router.get('/getItems', (req, res) => {
    const id = req.query.id;
    if(id){
        const item = items.find(item => item.id === +id);
        if(item){
            if(item.deleted){
                res.status(400).send('Item deleted');
            }else{
                res.status(200).json(item);
            }
        }else{
            res.status(404).json({msg: 'Item not found'});
        }
    }else{
        res.json(items.filter(items => items.deleted === false));
    }
});

//restore deleted items
router.patch('/restoreItems', (req, res) => {
    const id = req.query.id;
    if(id){
        const item = items.find(item => item.id === +id);
        if(item){
            if(item.deleted){
                item.deleted = false;
                res.status(200).json(item);
            }else{
                res.status(400).send('Item not deleted');
            }
        }else{
            res.status(404).json({msg: 'Item not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});



//Post 
router.post('/Items', (req, res) => {
    const {name, level, description, image, sell_price} = req.body;
    if(!name || !level || !description || !image || !sell_price){
        res.status(400).send('Missing fields');
    }else{
        const newItem = {
            id: items.length + 1,
            name,
            level,
            description,
            image,
            sell_price,
            deleted: false
        };
        items.push(newItem);
        res.status(201).json(newItem);
    }
});

// Delete
router.delete('/deleteItems', (req, res) => {
    const id = req.query.id;
    if(id){
        const item = items.find(item => item.id === +id);
        if(item){
            if(item.deleted){
                res.status(400).send('Item deleted');
            }else{
                item.deleted = true;
                res.status(200);
            }
        }else{
            res.status(404).json({msg: 'Item not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});

//Patch
router.patch('/updateItems', (req, res) => {
    const id = req.query.id;
    if(id){
        const item = items.find(item => item.id === +id);
        if(item){
            const {name, level, description, image, sell_price} = req.body;
            if(name){
                item.name = name;
            }
            if(level){
                item.level = level;
            }
            if(description){
                item.description = description;
            }
            if(image){
                item.image = image;
            }
            if(sell_price){
                item.sell_price = sell_price;
            }
            res.status(200).json(item);
        }else{
            res.status(404).json({msg: 'Item not found'});
        }
    }else{
        res.status(400).send('No id provided');
    }
});


module.exports = router;