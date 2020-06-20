const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


app.use(express.static('./assets'));
app.use(express.urlencoded());
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