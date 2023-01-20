
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import StudentModel from "./Schema/student_schema.js"
//configuring dotenv
dotenv.config();

//creating an express server
const app = express();

//using the cors middleware to the body of our reques in json format
app.use(cors());
app.use(express.json());

//assigning port number to server
const port = 8000;
//assigning database url to variable
const db = process.env.DB_URL
//creating a new studend
app.post('/student', async (req, res)=>{
    const{first_name,last_name,date_of_birth,school}=req.body;
    console.log('New student has been created',{first_name,last_name,date_of_birt,school});
    const studentModel =await StudentModel.creat({
        first_name,
        last_name,
        date_of_birth,
        school,
    })
    if (studentModel){
        return res.status(201).json({
            status:true,
            message:"User has been created",
            data:studentModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message:"Student profile was not successfully created",
        })
    }
   
})

//getting all student
app.get('/student', async (req, res)=>{
    const {status} = req.params
    console.log('New student created',status);
    const studentModel = await StudentModel.find().limit(3);
    if(studentModel){
        return res.status(201).json({
            status: true,
            message:"Student profile fetch successfully",
            data:studentModel
        })
        
    }else{
        return res.status(400).json({
            status: false,
            message:"Student profile was not fetched",
        })
    }

})
 //connecting to MongoDB database
 mongoose.connect(db, {
    useNewURLParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('conneced to db');
}).catch((error)=>{console.log(error);})


app.listen(port,()=>{console.log('server is connected and running')})