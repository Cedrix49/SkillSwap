import mongoose from "mongoose";


//Connect to MongoDB
let isConnected = false;

const connectDB = async () => {

    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
      }

    //Try to connect to MongoDB
    try {
        //Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/skillSwap`);
        
        //Log success
        console.log('Connected to MongoDB');
    } catch (error) {
        //Log error
        console.log(error);
    }

    //If error, log error
    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);
    })
}

export default connectDB;
