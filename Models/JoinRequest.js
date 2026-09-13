const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },

    requestor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    role: {
      type: String,
      required: true
    },

    message: {
      type: String
    },

  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const JoinRequest = mongoose.model('JoinRequest', joinRequestSchema);

module.exports = JoinRequest;