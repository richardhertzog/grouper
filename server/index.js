const express = require('express');
const path = require('path');

const app = express();

require('./middleware.js');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server listening on port:', PORT);
});

module.exports = app;
