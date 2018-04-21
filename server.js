const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');
statRoutes = require('./expressRouter/statRoutes');


mongoURI = 'mongodb://localhost/test';




mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || mongoURI).then(
  (client) => {
    console.log('Database is connected');

  },
  err => {
    console.log('Can not connect to the database' + err)
  }
);

const app = express();
app.use(bodyParser.json());
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());


app.get('/products/:id', function(req, res, next) {
  res.json({
    msg: 'This is CORS-enabled for all origins!'
  });
});


/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});*/
const port = process.env.PORT || 8080;
app.use('/stats', statRoutes);
const server = app.listen(port, function() {
  console.log('Listening on port ' + port);
});