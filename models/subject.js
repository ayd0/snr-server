const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    steps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Step" }],
});

exports.Subject = mongoose.model("Subject", subjectSchema);