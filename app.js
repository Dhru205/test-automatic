// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello dhru siddhi pre adaasm !');
});

const port = 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

