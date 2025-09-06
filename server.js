const express = require('express');
const morgan = require('morgan');
app.set('view engine', 'ejs');

const app = express()

// Listen for requests on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});


// Defining the routes 

app.get('/test', (req, res) => {
  res.send('<h1>Hello World</h1>');
});
