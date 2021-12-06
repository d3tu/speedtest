const express = require('express'),
  app = express(),
  size = 10485760,
  buffer = Buffer.alloc(size);

app.get('/', (_req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/file.test', (req, res) => {
  req.on('data', () => void 0);
  req.once('end', () => {
    res.set({ 'content-length': size });
    res.end(buffer);
  });
});

app.listen(3000);