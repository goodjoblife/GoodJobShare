const path = require('path');
const express = require('express');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res, next) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'dist'),
  }, err => {
    if (err) {
      next(err);
    }
  });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at 0.0.0.0:${port}`);
});
