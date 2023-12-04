const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const bubbleSchema = new Schema(
    {
        radius: { type: Number, required: true }, 
        color: { type: String, required: true },
        popup: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Bubble', bubbleSchema);