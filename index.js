const express = require('express');
const cookieParser =  require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const saasMiddleware = require('node-sass-middleware');
const moment = require('moment');
moment().format(); 

app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
 }));

app.use(express.static('./assets'));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

//extract style and scripts from sub pages into the  layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express Router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`); //interpolation -> concat variable in  string
    }
  
    console.log(`Server is running on port: ${port}`);
  });