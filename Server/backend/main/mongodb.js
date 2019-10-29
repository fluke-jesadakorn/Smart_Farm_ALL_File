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

  var findAll = SchemaFarm.find()

  // this is our get method
  // this method fetches all available data in our database
  router.get('/getData', async (req, res) => {
    try{
      let getData = await findAll
      await res.status(200).json(getData)
    }catch(err){
      res.status(400).json({status:"No Data"})
    }
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
    let index = req.body.params
    await console.log(index)
  });

  // this is our create methid
  // this method adds new data in our database
  router.post('/putData', (req, res) => {
    let data = new SchemaFarm();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }

    data.message = message;
    data.id = id;
    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  router.get('/button',(req,res)=>{
      console.log(req.body)
  })
  // append /api for our http requests
  app.use('/api', router);

  // launch our backend into a port
  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
}