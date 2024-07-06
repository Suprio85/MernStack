import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import colors from 'colors';
import cors from 'cors';
import path from 'path';
// routers
import goalRoutes from './routers/goalRoutes.js';
import userRoutes from './routers/userRoutes.js';

// middleware
import { errHandeler } from './middleware/errorHandeler.js';
import { connectDB } from './config/db.js';



try {
  connectDB();
}catch(error){
  console.error(`Error: ${error.message}`);
}




dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());






//routers
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);




app.get('/api/hi',(req,res,next)=>{
  res.json({message:'Hello World'})
})

// error handeler middleware
app.use(errHandeler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
})





