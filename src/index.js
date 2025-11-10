import express from 'express';
import mediaRouter from './routes/media-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// parse json from request bodies
app.use(express.json());

// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// Api endpoints
app.use('/api/media', mediaRouter);

// Users endpoints
// TODO: add user router and use it

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
