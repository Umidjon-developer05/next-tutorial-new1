import { MongoClient } from 'mongodb';

let uri: any = null;

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, { native_parser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client; // Resolve the promise with the connected client
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB Connection Error'); // Reject the promise if an error occurs
  }
}

const clientPromise = connectToMongoDB()
  .catch((error) => {
    // Handle the rejected promise here
    console.error('Unhandled promise rejection:', error);
    // Perform necessary actions or logging
    // For example, you might want to exit the process gracefully
    process.exit(1); // Exiting with a non-zero code to indicate an error
  });

export default clientPromise;
