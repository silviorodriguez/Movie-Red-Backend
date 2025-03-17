const { required, date } = require('joi');
const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    year: {
        type: Number,
    },
    runtime: {
        type: Number,
    },
    categories: {
        type: [String],
    },
    release_date: {
        type: Date,
    },
    director: {
        type: [String],
        required: [true, 'El director es obligatorio']
    },
    writer: {
        type: [String],
    },
    actors: {
        type: [String],
    },
    storyline: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = model('Movie', MovieSchema);
