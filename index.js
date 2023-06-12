const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const router = require('./routes');

const app = express();

var corsOptions = {
  // untuk branch main / vps
  origin: ['https://apolloproject.netlify.app', 'https://apollo-nextjs.netlify.app', 'http://localhost:3000'],
};

app.use(cors(corsOptions));

app.use(cookieParser());
const port = '5001';

app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
