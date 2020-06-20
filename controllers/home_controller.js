const mongoose = require('mongoose');
// const TodoList = require('../models/list');


//Loading home controller by fetching details from db
module.exports.home = function(request, response){
    return response.render('home',{
        title:'BeingPunctual',
    });  
}