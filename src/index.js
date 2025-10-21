import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const items = [
  {id: 10, name: 'Item1'},
  {id: 27, name: 'Item2'},
];

const server = http.createServer((req, res) => {
  console.log(`HTTP request: ${req.method} ${req.url}`);

  // GET all items
  if (req.method === 'GET' && req.url === '/items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(items));
  // GET item by id
  } else if (req.method === 'GET' && req.url.split('/')[1] === 'items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const requestedID = req.url.split('/')[2]
    // TODO: use request id to get the correct item object and add the object
    // to the response
    // TODO2: response 404 if object with the id does not exist
    res.end('{"requestedID": ' + requestedID + '}');
  // POST new item
  } else if (req.method === 'POST' && req.url === '/items') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        console.log('req body', body);
        const newItem = JSON.parse(body);
        // check latest id and add 1
        newItem.id = items[items.length-1].id + 1;
        items.push(newItem);
        res.statusCode = 201;
        res.end();
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
