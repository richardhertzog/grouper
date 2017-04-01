const express = require('express');
const path = require('path');
const apiRouter = require(path.join(__dirname, './routers/apirouter.js'));
require(path.join(__dirname, './config.js'))();

const app = express();
module.exports = app;

// middleware
require('./middleware.js')(app);

// static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Routers
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server listening on port:', PORT);
});
