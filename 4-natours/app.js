const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// Natours api methods
// Get
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ status: 'success', results: tours.length, tours });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({ status: 'success', data: { tour } });
});

// Post
app.post('/api/v1/tours', (req, res) => {
  const newId = tours.at(tours.length - 1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});