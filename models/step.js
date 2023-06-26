const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'open',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: '',
    },
    code: {
        type: String,
        default: '',
    },
    links: {
        type: Array,
        default: [],
    },
    // component: --> assignment will be part of state management
});

exports.Step = mongoose.model("Step", stepSchema);