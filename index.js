const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
// Connect to MongoDB
mongoose.connect(
  //Enter cluster link here
  "mongodb://localhost:27017/newone",
  { useNewUrlParser: true },
  mongoose.set("strictQuery", false)
);

// Create MongoDB Schema
const dataSchema = new mongoose.Schema({
  name: {type:String,required:true},
  
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());

app.get("/", (req,res) => {
  res.send("all 1ohk")
})

app.get("/data", async (req,res)=> {
  try{
    const items = await Data.find();
    res.send(items);
  }
  catch(err){
   res.send("something went wrong!");
   console.log(err);
  }
});

app.post('/data',async (req, res) => {
const {name}=req.body;

try {
  const data=new Data({name})
  await data.save();
  return res.status(200).send({data})
} catch (error) {
  return res.status(500).send({"message":"Something went wrong"})
}
});

app.get('/data/:id', (req, res) => {
  Data.findById(req.params.id)
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

app.listen(8080, () => console.log('Server listening on port 8080 successfully'));


