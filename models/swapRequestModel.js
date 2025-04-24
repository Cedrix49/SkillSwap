// models/SkillSwapRequest.js
import mongoose from 'mongoose';

const skillSwapRequestSchema = new mongoose.Schema({
  fromUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  toUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  skillOffered: { 
    type: String, 
    required: true 
  },
  skillRequested: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending',
  },
  message: { 
    type: String, 
    default: '' 
  },
  scheduledDate: { 
    type: Date, 
    default: null 
  },
  expiresAt: { 
    type: Date, 
    required: true, 
  }
}, { timestamps: true });

skillSwapRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


const skillSwapRequestModel = mongoose.models.skillSwapRequest || mongoose.model('skillSwapRequest', skillSwapRequestSchema);

export default skillSwapRequestModel;
