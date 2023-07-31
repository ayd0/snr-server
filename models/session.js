const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,   
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

exports.Session = mongoose.model("Session", sessionSchema);