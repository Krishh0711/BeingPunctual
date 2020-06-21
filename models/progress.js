const mongoose =  require('mongoose');

const progressSchema = new mongoose.Schema({
    habitId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
    }
},{
    timestamps: true
});

const Progress = mongoose.model('Progress',progressSchema);


module.exports = Progress;