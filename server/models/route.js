const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const routeSchema = new Schema(
    {
        label: String, 
        lineColor: { type: String, required: true },
        xStart: { type: Number, required: true },
        yStart: { type: Number, required: true },
        xEnd: { type: Number, required: true },
        yEnd: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Route', routeSchema);