import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dns from "dns";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dns.setServers(["1.1.1.1","8.8.8.8"])


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});