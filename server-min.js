const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Running from file:', __filename);

app.get('/test', (req,res)=>res.send('Server OK (min)'));
app.get('/animals', (req,res)=>res.send('Animals INDEX (min)'));
app.get('/animals/new', (req,res)=>res.send('Animals NEW (min)'));

app.listen(PORT, () => console.log(`MIN server on http://localhost:${PORT}`));
