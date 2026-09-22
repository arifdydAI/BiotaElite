const http = require('http');
const fs = require('fs');
const path = require('path');
const root = 'D:\\BiotaElite';
const types = { '.html': 'text/html', '.json': 'application/json', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const f = path.join(root, decodeURIComponent(p));
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'text/plain' });
    res.end(d);
  });
});
srv.listen(8500, () => { console.log('Server running on port 8500'); });