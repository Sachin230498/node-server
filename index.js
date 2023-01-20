const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydata', 
{ useNewUrlParser: true },mongoose.set('strictQuery', false));

// Create MongoDB Schema
const dataSchema = new mongoose.Schema({
  name: String,
  id: Number
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());

app.get("/", (req,res) => {
  res.send("all 1ohk")
})

app.get("/alldata", async (req,res)=> {
  try{
    const items = await Data.find();
    res.send(items);
  }
  catch(err){
   res.send("something went wrong!");
   console.log(err);
  }
});

app.post('/data', (req, res) => {
  const data = new Data(req.body);
  data.save()
  res.send(data)
    .then(() => res.status(200).send('Data saved'))
    .catch(error => console.error(error));
});

app.get('/data/:id', (req, res) => {
  Data.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

app.listen(8081, () => console.log('Server listening on port 8081 successfully'));


