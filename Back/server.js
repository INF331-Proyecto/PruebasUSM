const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB Atlas connection URL
const atlasConnectionUrl = 'mongodb+srv://bkret:RobinKana@cluster1.o7fispg.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

// Create a reusable function to connect to MongoDB and retrieve data
async function connectToDatabase() {
  const client = new MongoClient(atlasConnectionUrl);

  try {
    await client.connect();

    const collection = client.db('tienda').collection('productos');
    const result = await collection.find({}).toArray();

    return result;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error; 
  } finally {
    client.close();
  }
}

// Define your endpoint to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await connectToDatabase();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});