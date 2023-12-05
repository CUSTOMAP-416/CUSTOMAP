const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const heatSchema = new Schema(
    {
        label: String, 
        number: { type: Number, required: true }, 
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Heat', heatSchema);