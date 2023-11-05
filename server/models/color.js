const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const colorSchema = new Schema(
    {
        color: { type: String, required: true },
        property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    }
);
    
module.exports = mongoose.model('Color', colorSchema);