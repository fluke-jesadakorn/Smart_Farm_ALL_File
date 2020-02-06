require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SchemaFarm = require('./SchemaFarm');
const path = require('path');
const app = express();
const router = express.Router();
const MongoPORT = process.env.MongoPORT || 5000
const MongoURL = process.env.MONGO_URL 
app.use(cors());
// connects our back end code with the database
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('MongoDB_API Connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is our get method
// this method fetches all available data in our database
router.get('/getData', async (req, res) => {
    try {
        let getData = await SchemaFarm.find()
        await res.status(200).json(getData)
    } catch (err) {
        console.log('Cannot get data because : ' + err)
    }
})

router.get('/getLastData', async (req, res) => {
    try {
        let getData = await SchemaFarm.find().limit(1).sort({$natural:-1})
        await res.status(200).json(getData)
    } catch (err) {
        console.log('Cannot get data because : ' + err)
    }
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    try {
        const { id, update } = req.body;
        SchemaFarm.findByIdAndUpdate(id, update, (err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    } catch (err) {
        console.log('Cannot update data because : ' + err)
    }
});

// this is our delete method
// this method removes existing data in our database
router.put('/deleteData', async (req, res) => {
    try{
        const { idToDelete } = req.body.data;
        console.log(idToDelete);
        await SchemaFarm.deleteOne({ id: idToDelete });
        await res.status(200).json({ status: "success" });
    }catch(err){
        console.log('Cannot delete data because : ' + err);
    }
});

// this is our create methid
// this method adds new data in our database
router.post('/addData', async (req, res) => {
    try {
        //Auto Increment ID
        let getList = await SchemaFarm.find()
        let getCurrentId = await getList.map((id) => { return id.id })
        let CurrentId = await Math.max.apply(null, getCurrentId)
        if (CurrentId === -Infinity)
            CurrentId = 0
        else
            CurrentId++
    
        let JsonData = await req.body.data
        let date = await new Date()
        let addData = await new SchemaFarm({ id: CurrentId, data: JsonData, date: date })
        await addData.save()
        await res.status(200).json({ status: "success" })
    } catch (err) {
        res.status(400).json({ status: "Cannot insert data because : " + err })
        console.log(err)
    }
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(MongoPORT, () => console.log(`MongoDB API Start on : 0.0.0.0:${MongoPORT}`));
