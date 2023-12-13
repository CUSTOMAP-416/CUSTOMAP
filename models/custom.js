const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const customSchema = new Schema(
    {
        number: { type: Number }, 
        string: { type: String },
        label: { type: String },
        value: { type: String },
        color:  { type: String },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    }
);
    
module.exports = mongoose.model('Custom', customSchema);