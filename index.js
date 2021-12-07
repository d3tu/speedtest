const express = require('express'),
  app = express(),
  size = 10485760,
  buffer = Buffer.alloc(size);

app.get('/', (_req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/file.test', (req, res) => {
  req.once('data', () => void 0);
  req.once('end', async () => {
    let sizeQ = req.query['size'], stop;
    if (isNaN(sizeQ) || sizeQ < 10) sizeQ = 10;
    else if (sizeQ > 100) sizeQ = 100;
    sizeQ = 0.1 * sizeQ;
    res.set({ 'content-length': size * sizeQ });
    while (sizeQ--) {
      if (stop) break;
      await new Promise(next => res.write(buffer, err => {
        if (err) stop = true;
        setTimeout(next, 1);
      }));
    }
    res.end();
  });
});

app.listen(process.env['PORT'] || 3000);