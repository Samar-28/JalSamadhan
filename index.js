const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/Auth'))

mongoose.connect('mongodb+srv://targetsih2023:4JCEsZbnq10Zr2CX@bytebrigade.wftiyhj.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{console.log(err)})

const server = app.listen(5000,()=>{
    console.log(`Connected to server on port 5000`);
})
