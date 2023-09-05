const mongoose = require('mongoose');
//const User = require('./user.model');

const LeaveRequestSchema = new mongoose.Schema({
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  from: {type: Date, required: true },
  to: { type: Date, required: true },
  NDays: { type: Number, required: true },
  RDays: { type: Number, required: true },
  leave_reason: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  LeaveType:{type:String,required:true},
  comment:{type:String}
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);

module.exports = LeaveRequest;
