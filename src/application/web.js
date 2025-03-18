import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';
import cors from 'cors'

export const web = express();

// Local
// web.use(cors({
//     origin: 'http://localhost:5173', // Allow only this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
// }));

// Product
web.use(cors({
    origin: process.env.VERCEL_ENV
        ? process.env.VERCEL_URL
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
web.use(express.json());

web.use(publicRouter);

web.use(userRouter);

web.use(errorMiddleware);