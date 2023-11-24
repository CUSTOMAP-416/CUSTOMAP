const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const textSchema = new Schema(
    {
        text: { type: String, required: true }, 
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Text', textSchema);