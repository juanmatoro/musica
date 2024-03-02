const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    //1970-01-01 - año-mes-dia
    birthday: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    }
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;