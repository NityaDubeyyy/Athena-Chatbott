// Load environment variables IMMEDIATELY
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';

const app = express();

// Connect to MongoDB AFTER loading .env
await connectDB();

//stripe webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRouter)
app.use('/api/credit',creditRouter)

// listen
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
