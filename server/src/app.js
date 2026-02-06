import express from 'express';
import router from './routes/router.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.use('/api', router);

export default app;
