const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

let database = JSON.parse(fs.readFileSync('database.json'));

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/films', (req, res) => {
  res.json(database);
});

app.get('/films/:id', (req, res) => {
  const film = database.find(f => f.imdbID === req.params.id);
  if (film) {
    res.json(film);
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
});

app.post('/films', (req, res) => {
  const newFilm = req.body;
  database.push(newFilm);
  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  res.status(201).json(newFilm);
});

app.delete('/films/:id', (req, res) => {
  const index = database.findIndex(f => f.imdbID === req.params.id);
  if (index !== -1) {
    database.splice(index, 1);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
});

app.put('/films/:id', (req, res) => {
  const index = database.findIndex(f => f.imdbID === req.params.id);
  if (index !== -1) {
    database[index] = { ...database[index], ...req.body };
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    res.json(database[index]);
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
});

app.get('/search', (req, res) => {
  const query = req.query.title.toLowerCase();
  const results = database.filter(f => f.Title.toLowerCase().includes(query));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
