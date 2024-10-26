import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return
    }

    let mongoEnv: string

    if (process.env.MONGODB_URI) {
        mongoEnv = process.env.MONGODB_URI
    } else {
        throw new Error("MONGODB URI environment variable is not set")
    }

    try {
        
        await mongoose.connect(mongoEnv, {
            dbName: 'ecommerce_db',
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)
        
        isConnected = true;

        console.log('MongoDB connected');
    
    } catch (error) {
        console.log(error);
        
    }
}