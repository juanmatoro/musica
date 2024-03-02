const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    isrc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contributors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contributor'
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    lineCYear: {
        type: Number,
        required: true,
        trim: true
    },
    lineCPublisher: {
        type: String,
        required: true,
        trim: true
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;