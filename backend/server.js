import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import goalRoutes from './routers/goalRoutes.js';
import { errHandeler } from './middleware/errorHandeler.js';




dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());





//routers
app.use('/api/goals', goalRoutes);



// middleware
app.use(errHandeler);

app.get('/api/hi',(req,res,next)=>{
    res.json({message:'Hello World'})
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
})





