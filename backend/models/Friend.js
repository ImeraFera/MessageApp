import { Schema, model } from 'mongoose';

const friendSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Accepted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Friend', friendSchema);
