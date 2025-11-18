import express from 'express';
// read .env file
import 'dotenv/config';
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handlers.js';

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();

//console.log(process.env);

// parse json from request bodies
app.use(express.json());

// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// Api endpoints
app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// not found route
app.use(notFoundHandler);
// generic error handler
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
