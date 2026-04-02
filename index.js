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
// import pdfRouter from './routes/pdfRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());

// CORS Configuration
// app.use(cors({
//     origin: CLIENT_URL,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);
app.use('/api/users', userRouter);
app.use('/api/export', exportRouter);
app.use('/api/export', exportWordRouter);
app.use('/api/config', formConfigRouter);
// app.use('/api/pdf', pdfRouter);

app.get('/', (req, res) => {
    res.send('Backend API is running try it ..');
});

// Global Error Handler
app.use(errorHandler);

// --- VERCEL FIXES START HERE ---

// Connect to MongoDB without blocking the server export
connectDB(MONGODB_URI).catch(err => console.error("MongoDB connection failed:", err));

// Only run app.listen locally (Vercel handles the port automatically)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

// CRUCIAL FOR VERCEL: You must export the app!
export default app;