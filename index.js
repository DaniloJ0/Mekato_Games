const express= require('express')
const res = require('express/lib/response');

const app = express();
app.use(express.json());
app.listen(3000,()=>{
    console.log('This server is running');
});







