const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido' ]
    },
    email: {
        type: String,
        required: [true, 'El Email es requerido' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El Password es requerido' ],
    }
    },{
       timestamps: true
    });

module.exports = mongoose.model('User', userSchema);
