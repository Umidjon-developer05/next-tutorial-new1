import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB Connection Error');
  }
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectToMongoDB();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = connectToMongoDB();
}

export default clientPromise;
