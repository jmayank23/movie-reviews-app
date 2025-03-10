import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // DAO = Data Access Object
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

const MongoClient = mongodb.MongoClient

// Get MongoDB credentials from environment variables
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const mongo_cluster = process.env.MONGO_CLUSTER

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}/?retryWrites=true&w=majority&appName=Cluster0`

const port = process.env.PORT || 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500
  }
)
.catch(err => {
  console.error("MongoDB connection error:", err.stack) // similar to console.log(), just communicates there's an error
  process.exit(1)
})
.then(async client => { // once we connect to the database using MongoClient, we will get the "client" object
  await ReviewsDAO.injectDB(client) // send our DB connection to ReviewsDAO
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log(`Using MongoDB username: ${mongo_username}`)
  })
}) 