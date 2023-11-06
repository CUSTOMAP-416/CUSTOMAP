const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const profileSchema = new Schema(
    {
        name: String,
        phone: String, 
    }
);

module.exports = mongoose.model('Profile', profileSchema);