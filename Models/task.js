const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    /* project: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Project',
   required: true
 }*/
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },],
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'completed'],
        required: true,
        default: 'todo'
    }
},
    {
        timestamps: { createdAt: true, updatedAt: false }
    })

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;