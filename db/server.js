const express= require('express');
const app = express();

// webpage
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
    });
});

module.exports = app; 