module.exports ={database}
function database(){
  require('dotenv').config()
  const mongoose = require('mongoose');
  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const logger = require('morgan');
  const store = require('./store')
  const SchemaFarm = require('./SchemaFarm');

  const API_PORT = 5004;
  const app = express();
  app.use(cors());
  const router = express.Router();

  // this is our MongoDB database
  const dbRoute =
    'mongodb://61.19.181.29:5000/SmartFarm';

  // connects our back end code with the database
  mongoose.connect(dbRoute, { useNewUrlParser: true });

  let db = mongoose.connection;

  db.once('open', () => console.log('connected to the database'));

  // checks if connection with the database is successful
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // this is our get method
  // this method fetches all available data in our database
  router.get('/getData', async (req, res) => {
      let getData = await SchemaFarm.find()
      await res.status(200).json(getData)
  })

  // this is our update method
  // this method overwrites existing data in our database
  router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
      SchemaFarm.findByIdAndUpdate(id, update, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  // this is our delete method
  // this method removes existing data in our database
  router.delete('/deleteData', async (req, res) => {
    let deleteIndex = await req.body.params
    await SchemaFarm.remove({id:deleteIndex})
    res.status(200).json({status:"success"})
  });

  // this is our create methid
  // this method adds new data in our database
  router.post('/addData', async (req, res) => {
    try {
      let getList = await SchemaFarm.find()
      let getCurrentId = await getList.map((id)=>{return id.id})
      let CurrentId = await Math.max.apply(null, getCurrentId)
      if(CurrentId == -Infinity)
        CurrentId = 0
      else
        CurrentId++
      let JsonData = await req.body.data
      let date = await new Date()
      let addData = await new SchemaFarm({ id : CurrentId, data : JsonData, date : date })
      await addData.save()
      await res.status(200).json({status:"success"})
    }catch(err){
      res.status(400).json({status:"Cannot insert data : " + err})
    }
  });

  router.get('/button',(req,res)=>{
      console.log(req.body)
  })
  // append /api for our http requests
  app.use('/api', router);

  // launch our backend into a port
  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
}