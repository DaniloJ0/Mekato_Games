const express= require('express')
const res = require('express/lib/response')

const app = express()

app.use(express.json())

app.listen(3000,()=>{console.log('This server is running');})


const characters_stats = require('./characters_stats')
const characters = require('./characters')
const images_2d= require('./images_2d')
const items = require('./items')
const mission_objectives = require('./mission_objectives')
const missions= require('./missions')
const models_3d = require('./models_3d')
const player_characters = require('./player_characters')
const players = require('./players')

app.use('/characters_stats', characters_stats)
app.use('/characters', characters)
app.use('/images_2d', images_2d)
app.use('/items', items)
app.use('/mission_objectives', mission_objectives)
app.use('/missions', missions)
app.use('/models_3d', models_3d)
app.use('/player_characters', player_characters)
app.use('/players', players)










