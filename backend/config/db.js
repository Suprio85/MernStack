import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    
    try{
        const connection = await mongoose.connect(process.env.MONGOOSE_URI)
        
        console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline);

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(-1);
    }
}


