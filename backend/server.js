import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dns from "dns";
import connectDB from './config/db.js';

dns.setServers(["1.1.1.1","8.8.8.8"])


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});