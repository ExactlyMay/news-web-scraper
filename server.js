//dependencies
var express = require('express');;
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

//initializing the app
const app = express();

//setting up the database
const config = require('./config/database');
mongoose.Promise = Promise;
mongoose
  .connect(config.database)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(error => console.log('There was an error with your connection:', error));

//setting up Morgan middleware
app.use(logger('dev'));

//setting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setting up handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/articles',express.static(path.join(__dirname, 'public')));
app.use('/notes',express.static(path.join(__dirname, 'public')));


//setting up routes
const index = require('./routes/index'),
      articles = require('./routes/articles'),
      notes = require('./routes/notes'),
      scrape = require('./routes/scrape');

app.use('/', index);
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});