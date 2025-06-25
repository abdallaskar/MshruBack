import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

import authRoutes from './routes/authRoutes.js';
import formRoutes from './routes/formRoutes.js';
import userRouter from './routes/userRoutes.js';
import exportRouter from './routes/exportRoutes.js';
// import pdfRouter from './routes/pdfRoutes.js'
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL


const app = express();

app.use(express.json());
app.use(cors({

    origin: CLIENT_URL,
    credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);
app.use('/api/users', userRouter);
app.use('/api/export', exportRouter);
// app.use('/api/pdf', pdfRouter);


connectDB(MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`app lisent on port ${PORT}`);
    })
});

// Global Error Handler
app.use(errorHandler);

