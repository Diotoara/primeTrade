import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import assetRoutes from './routes/assetRoutes';
import { error } from 'node:console';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/assets', assetRoutes);

// Scalability: Health Check for Load Balancers
app.get('/health', (req, res) => res.status(200).send('OK'));

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("mongo db connectrd")
}).catch((error) => {
    console.log("error while connecting to db server")
})

app.listen(5000, () => console.log("🚀 Server running on port 5000"));