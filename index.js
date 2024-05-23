const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors({
  origin: [
      'http://localhost:5173',
 
  ],
  credentials: true
}));
app.use(express.json());



const uri = process.env.DB_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {


const db = client.db("GominosdB")
    const UserCollection = db.collection("User");
    const FoodCollection = db.collection("Food");


    app.post("/user-data-send", async (req, res) => {
        const User = req.body;
        const result = await UserCollection.insertOne(User);
        res.send(result);
      });

      app.get("/user-data-get", async (req, res) => {
        const User =  UserCollection .find();
        const result = await User.toArray();
        res.send(result);
      });
      
      app.get("/food-data-get", async (req, res) => {
        const User =  FoodCollection.find();
        const result = await User.toArray();
        res.send(result);
      });
 


 
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome To Gominos Server ')
})

app.listen(port, () => {
  console.log(`Gominos Server listening on port ${port}`)
})