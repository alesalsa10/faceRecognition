const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //enviroment variables package
const tokenValidation = require('./routes/token-validation');
const cors = require('cors');

app.use(express.json());
app.use(cors());

dotenv.config();

const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/user');
const updateEntriesRoute = require('./routes/updateEntries');

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log('Conntected to db')
);

//the path is already created on auth.js with router
app.use('/', authRoutes);

//tokenValidation is the middleware
app.use('/', tokenValidation, homeRoute);
app.use('/', tokenValidation, updateEntriesRoute);

app.listen(3000, () => console.log('server is running...'));

