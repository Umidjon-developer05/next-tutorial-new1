const MongoClient = require('mongodb').MongoClient;
let uri: any = null;

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB Connection Error');
  }
}


const clientPromise = connectToMongoDB();

export default clientPromise;
