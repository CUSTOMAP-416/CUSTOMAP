const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const mapSchema = new Schema(
    {
        title: { type: String, required: true },
        owner: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }], 
        mapData: { type: Object, required: true},
        description: String,
        visibility: { type: String, default: 'private' },
        discussions: [{ type: Schema.Types.ObjectId, ref: 'Discussion' }], 
        legend: [String],
        texts: [{ type: Schema.Types.ObjectId, ref: 'Text' }],
        colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
        properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }], 
        createdDate: { type: Date, default: Date.now },
    }
);
    
module.exports = mongoose.model('Map', mapSchema);
