const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/Auth'))
app.use('/',require('./routes/Report'))
app.use('/',require('./routes/Heat'))
app.use('/forums',require('./routes/Forum'))
app.use('/',require('./routes/Announcement'))
app.use('/',require('./routes/Contributors'))
app.use('/resource',require('./routes/ReqResource'))

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{console.log(err)})

const server = app.listen(5000,()=>{
    console.log(`Connected to server on port 5000`);
})
