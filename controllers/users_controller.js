const User =  require('../models/user');
const Habit = require('../models/habit');
const Progress = require('../models/progress');
const moment = require('moment');
moment().format(); 

module.exports.profile = function(request,response){
   if(request.cookies.user_id){
      User.findById(request.cookies.user_id,function(err,user){
         if(user){
            return response.render('user_profile',{
               title: "User Profile",
               user: user
            })
         }else{
            return response.redirect('/users/sign-in');
         }
      })
   }else{
      return response.redirect('/users/sign-in');
   }
}

module.exports.addHabit = function(request,response){
  if(request.cookies.user_id){
     User.findById(request.body.userId,function(err,user){
        if(err){
           console.log('User not found');
           return;
        }
        Habit.create(request.body,function(err,habit){
         if(err){
            console.log(err);
            return response.redirect('back');
         }
         user.habits.push(habit);
         user.save();
         return  response.redirect('back');
         });

     });   
  }else{
     return response.redirect('back');
  }
}

module.exports.getHabitDetail = function(request,response){
    let userId = request.cookies.user_id;
    if(userId){
      const todayDate = new Date().toDateString();
      const tomorrow = moment().add(1, 'day').toDate().toDateString();
      const weekBefore = moment().subtract(6, 'day').toDate().toDateString();
       Progress.find({userId:userId,habitId:request.params.id,createdAt:{$gt: weekBefore, $lt:tomorrow}},function(err,habitDetail){
         if(err){
            console.log('error in finding habitDetail');
         }
         
         Progress.find({userId:userId,habitId:request.params.id,createdAt:{$gt: todayDate, $lt:tomorrow}},function(err,isPresent){
            if(err){
               console.log('error in finding today habit detail');
            }
            Habit.findById(request.params.id,function(err,habit){
               if(err){
                  console.log('error in finding habit--> getHabitDetail');
               }
               User.findById(userId,function(err,user){
                 if(err){
                    console.log(err);
                 }
                 return response.render('pending_status',{
                  title:"Progress",
                  isPresent:isPresent,
                  habitDetail:habitDetail,
                  habit:habit,
                  user:user,
                  startDate:weekBefore,
                  endDate:todayDate,
                  moment: moment
               }); 
               });
               
            });
         });
       });
    }else{
       return response.redirect('back');
    }
}

module.exports.insertProgress = function(request,response){
   Progress.create(request.body,function(err,progress){
      if(err){
         console.log('error in inserting progress');
      }
      return response.redirect('back');
   })
}

//render the sign up page
module.exports.signUp = function(request,response){
   return response.render('user_sign_up',{
      title:"BeingPunctual | Sign Up"
   });
}

//render the sign in page
module.exports.signIn = function(request,response){
   return response.render('user_sign_in',{
      title:"BeingPunctual | Sign In"
   });
}

//get the sign up data
module.exports.create = function(request,response){
  if(request.body.password !=  request.body.confirm_password){
     return response.redirect('back');
  }

  User.findOne({email: request.body.email},function(err,user){
     if(err){console.log('error in finding user in signing up'); return}

     if(!user){
        User.create(request.body, function(err,user){
         if(err){console.log('error in creating user in signing up'); return} 

         return response.redirect('/users/sign-in');
        });
     }else{
      return response.redirect('back');
     }
  })
}

//sign in and create session for user   
module.exports.createSession = function(request,response){
   //steps to authenticate

   //find the user 
   User.findOne({email: request.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing in'); return}  
       //handle user found
      if(user){
       //hand password which don't match
       if(user.password != request.body.password){
         return response.redirect('back');
       }
       //handle session creation
       response.cookie('user_id',user.id);
       return response.redirect('/users/profile');

      }else{
         //handle user not found
         return response.redirect('back');
      }
   });
   
}

module.exports.signOut = function(request,response){
   if(request.cookies.user_id){
      response.clearCookie('user_id');
      return response.redirect('/users/sign-in');
   }else{
      return response.redirect('/users/sign-in');
   }
}