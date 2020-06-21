const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    //include the array of ids of all habits in this user schema itself
 habits:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Habit'
    }
]
},{
    timestamps: true
});

const User = mongoose.model('User',userSchema);


module.exports = User;