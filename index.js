const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// Init middleware for getting request object value
//
app.use(express.json({ extended: false })); // to get the request
app.get('/api', (req, res) => {
  res.send('backend is working');
});
app.use('/api/users', require('./routes/user'));
app.use('/api/list', require('./routes/list'));
app.use('/api/tag', require('./routes/tag'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build')),
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`\nServer starts at ${PORT}\n`));
