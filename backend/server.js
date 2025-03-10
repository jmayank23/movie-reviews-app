import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

const app = express()
app.use(cors()) // this is how we use middleware (cors)
app.use(express.json()) // this will allow our server to accept json in the body of our request

app.use('/api/v1/reviews', reviews)
app.use("*", (req, res) => 
  res.status(404).json({ error: 'not found' }))

export default app