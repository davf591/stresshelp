require('dotenv').config();

const express = require('express');
const spawn = require('child_process').spawn;
const mongoose = require('mongoose');
const cors = require('cors');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const appointmentRoutes= require('./routes/appointments');
const workoutRoutes = require('./routes/api/workouts');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser')

mongoose.set('strictQuery', true);
// express app
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const options = {
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main',
  partialsDir: 'views/partials/',
  helpers: require('./helpers/hbs'),
  extname: '.hbs',
};
const hbs = require('handlebars');
hbs.registerHelper("each-in", function(value, options)
{
  return parseInt(value) + 1;
});
app.engine('.hbs', engine(options));
app.set('view engine', '.hbs');
app.set('views', './views');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });
app.get('/python', cb);
function cb(req, res) {
  const process = spawn('python', ['./scripts/kubios.py']);

  process.stdout.on('data', function (data) {
    res.send(data.toString());
    // res.send(data.toJSON());
  });
}
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/', appointmentRoutes); 
// connect to db
mongoose
  .connect(process.env.MONGO_URI_LOCAL)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log(err);

  })
  .catch((err) => {
    console.log(err);
  });
