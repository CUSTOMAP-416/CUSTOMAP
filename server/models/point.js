const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const pointSchema = new Schema(
    {
        label: String, 
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Point', pointSchema);