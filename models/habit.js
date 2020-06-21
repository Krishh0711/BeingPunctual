const mongoose =  require('mongoose');

const habitSchema = new mongoose.Schema({
    habit:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},{
    timestamps: true
});

habitSchema.index({'habit': 1, 'userId': 1}, {unique: true});


const Habit = mongoose.model('Habit',habitSchema);


module.exports = Habit;