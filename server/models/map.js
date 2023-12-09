const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const mapSchema = new Schema(
    {
        title: { type: String, required: true },
        owner: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }], 
        mapData: { type: Object, required: true},
        description: String,
        visibility: { type: String, default: 'private' },
        mapType: { type: String, required: true },
        discussions: [{ type: Schema.Types.ObjectId, ref: 'Discussion' }], 
        texts: [{ type: Schema.Types.ObjectId, ref: 'Text' }],
        colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
        legends: [{ type: Schema.Types.ObjectId, ref: 'Legend' }], 
        font: String,
        backgroundColor: String,
        customs: [{ type: Schema.Types.ObjectId, ref: 'Custom' }], 
        thematicLegends: [{
            value: { type: Number },
            color: { type: String },
            visibility: { type: Boolean },
            opacity: { type: Number },
        }],
        createdDate: { type: Date, default: Date.now },
    }
);
    
module.exports = mongoose.model('Map', mapSchema);
