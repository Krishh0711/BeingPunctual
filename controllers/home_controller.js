const mongoose = require('mongoose');
const Habit = require('../models/habit');
const User = require('../models/user');


//Loading home controller by fetching details from db
module.exports.home = function(request, response){
    let userId = request.cookies.user_id
    
    if(userId){
        User.findById(userId,function(err,user){
            if(err){
                console.log(err);
                return;
            }
            Habit.find({userId:userId},function(err,habits){
                if(err){
                    console.log(err);
                    return;
                }
              return response.render('home',{
                title:"Home",
                userId:userId,
                habits:habits,
                user:user
              });
            });
        })
    }else{

         return response.render('home',{
                title:"Home",
                userId:userId
              });
    }
}