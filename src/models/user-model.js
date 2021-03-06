const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user: { type: String },
    troll_counter: { type: Number, default: 0 },
    entraron_counter: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

