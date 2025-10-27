import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  {id: 2, name: 'eka'},
  {id: 11, name: 'toka juttu'},
];

// Config for Pug template engine
app.set('views', './views');
app.set('view engine', 'pug');
// Serve pug template (server root)
app.get('/', (req, res) => {
  const content = {
    title: 'My Pug page',
    text: 'tässä tallennetut itemit',
    items,
  };
  res.render('index', content);
});
// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));

// Endpoints for /items API
app.get('/api/items', (req, res) => {
  res.json(items);
});
app.get('/api/items/:id', (req, res) => {
  // TODO: choose correct item based on id property and send it
  res.json({request_id: req.params.id})
});
app.delete('/api/items/:id', (req, res) => {
  // TODO: delete correct item based on id property
  res.json({deleteid_id: req.params.id})
});
app.post('/api/items', (req, res) => {
  // TODO: add new item to items[] (viime viikon harkka)
  // TODO: add created item to response
  res.sendStatus(201);
});
app.put('/api/items/:id', (req, res) => {
  // TODO: modify correct item based on id property
  res.json({modify_id: req.params.id})});

// Start the server  
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
