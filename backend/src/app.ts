import express from 'express';
// use cors because front end and backend server use diffrrent ports
import cors from 'cors'; 

import userRoutes from './routes/userRoutes';

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use('/api', userRoutes);

export default app;
