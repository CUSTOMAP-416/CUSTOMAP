const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const choroplethSchema = new Schema(
    {
        ID: { type: String, required: true },
	    Statistic: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    }
);
    
module.exports = mongoose.model('Choropleth', choroplethSchema);