const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// Routing

const getAllTours = (req, res) => {
  res.status(200).json({ status: 'success', results: tours.length, tours });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  res
    .status(200)
    .json({ status: 'success', data: '<Here is an updating tour...>' });
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length)
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined yet!' });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined yet!' });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined yet!' });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined yet!' });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined yet!' });
};
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Routes

// app.use((req, res, next) => {
//   console.log('Hello from the middleware ✋');
//   next();
// // This middleware function executes every time when a new request happens.
// });

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
