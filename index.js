const express= require('express')
const res = require('express/lib/response')

const app = express()

app.use(express.json())

app.listen(3000,()=>{console.log('This server is running');})


const characters_stats = require('./characters_stats')
const characters = require('./characters')
const images_2d= require('./images_2d')
const items = require('./routes/items')
const mission_objectives = require('./routes/mission_objectives')
const missions= require('./routes/missions')
const models_3d = require('./routes/models_3d')
const player_characters = require('./routes/player_characters')
const players = require('./routes/players')

app.use('/truynob', characters_stats)
app.use('/truynob', characters)
app.use('/truynob', images_2d)
app.use('/truynob', items)
app.use('/truynob', mission_objectives)
app.use('/truynob', missions)
app.use('/truynob', models_3d)
app.use('/truynob', player_characters)
app.use('/truynob', players)










