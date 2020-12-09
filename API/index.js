const express = require('express');
const cors = require('cors');
const tokenValidation = require('./routes/token-validation');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(cors());
app.use(express.json());

//connect to db
mongoose.connect(
  config.get('DB_CONNECT'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log('Conntected to db')
);

const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/user');
const updateEntriesRoute = require('./routes/updateEntries');


app.get('/', (req, res) => {res.send('it is working!')})

//the path is already created on auth.js with router
app.use('/', authRoutes);

//tokenValidation is the middleware
app.use('/', tokenValidation, homeRoute);
app.use('/', tokenValidation, updateEntriesRoute);

app.listen(process.env.PORT || 3000, function(){
  console.log(`App is running on port ${process.env.PORT}`);
});
