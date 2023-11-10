const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const propertySchema = new Schema(
    {
        key: { type: String, required: true },
        value: { type: String, required: true }, 
    }
);
    
module.exports = mongoose.model('Property', propertySchema);