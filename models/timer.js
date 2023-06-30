const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
    // implement later with sessions
    sessionId: {
        type: String,
        default: "",
    },
    timestamps: [
        {
            time: {
                type: Number,
                required: true,
            },
            status: {
                sequence: {
                    type: String,
                    required: true,
                },
                min: {
                    type: Number,
                    required: true,
                },
                max: {
                    type: Number,
                    required: true,
                },
                buffer: {
                    type: Number,
                    required: true,
                },
            },
        },
    ],
});

exports.Timer = mongoose.model("Timer", timerSchema);
