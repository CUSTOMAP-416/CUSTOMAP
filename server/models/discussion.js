const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const discussionSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        map: { type: Schema.Types.ObjectId, ref: 'Map', required: true }, 
        content: String,
        createdDate: { type: Date, default: Date.now },
    }
);
    
module.exports = mongoose.model('Discussion', discussionSchema);