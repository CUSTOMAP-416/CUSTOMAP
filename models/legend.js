const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const legendSchema = new Schema(
    {
        color: { type: String, required: true },
        label: { type: String, required: true }, 
    }
);
    
module.exports = mongoose.model('Legend', legendSchema);