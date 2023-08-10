import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import artistRouter from './routes/artist';
import trackRouter from './routes/track';
import albumRouter from './routes/album';
import genreRouter from './routes/genre';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/artist', artistRouter);

app.use('/track', trackRouter);

app.use('/album', albumRouter);

app.use('/genre', genreRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
