const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const colorSchema = new Schema(
    {
        color: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Color', colorSchema);