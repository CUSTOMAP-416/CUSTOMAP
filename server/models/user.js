const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true }, 
        email: { type: String, required: true, unique: true }, 
        passwordHash: { type: String, required: true },
        role: { type: String, required: true, default: 'user'},
        profile: { type: Schema.Types.ObjectId, ref: 'Profile' }, 
        maps: [{ type: Schema.Types.ObjectId, ref: 'Map' }], 
        createdDate: { type: Date, default: Date.now },
    }
);

module.exports = mongoose.model('User', userSchema);