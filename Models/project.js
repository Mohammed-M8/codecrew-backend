const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }],
    requiredRoles: [{
        role: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
        required: true
    },
}, {
    timestamps: true
})

projectSchema.pre('findOneAndDelete', async function () {
    const projectId = this.getQuery()._id;
    const Task = mongoose.model('Task');
    const JoinRequest = mongoose.model('JoinRequest');

    await Promise.all([
        Task.deleteMany({ project: projectId }),
        JoinRequest.deleteMany({ project: projectId }),
    ]);
});

const Project = mongoose.model('Project', projectSchema)
module.exports = Project;