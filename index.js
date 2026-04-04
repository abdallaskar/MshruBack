import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';
import userRouter from './routes/userRoutes.js';
import exportRouter from './routes/exportRoutes.js';
import exportWordRouter from './routes/exportWordRoutes.js';
import formConfigRouter from './routes/formConfigRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

// 1. ACTIVE CORS CONFIGURATION 
app.use(cors({
    origin: ['https://mshru-qassim.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);
app.use('/api/users', userRouter);
app.use('/api/export', exportRouter);
app.use('/api/export', exportWordRouter);
app.use('/api/config', formConfigRouter);

app.get('/', (req, res) => {
    res.send('Backend API is running continuously on Render!');
});

// Global Error Handler
app.use(errorHandler);

// --- RENDER SERVER SETUP ---

// Connect to MongoDB, then start the server
if (MONGODB_URI) {
    connectDB(MONGODB_URI).then(() => {
        // Render REQUIRES this to run without any "if" conditions
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    }).catch(err => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
} else {
    console.error("CRITICAL ERROR: MONGO_URI is missing from environment variables.");
    process.exit(1);
}