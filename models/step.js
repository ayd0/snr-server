const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'open',
        required: true,
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    text: {
        type: String,
        default: '',
        required: true,
    },
    code: {
        type: String,
        default: '',
        required: true,
    },
    links: {
        type: Array,
        default: [],
        required: true,
    },
    // component: --> assignment will be part of state management
});

exports.Step = mongoose.model("Step", stepSchema);