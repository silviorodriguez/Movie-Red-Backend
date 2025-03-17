const mongoose = require('mongoose');


const dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN_DEV, {
        });
        console.log('Conexión Exitosa con la Base de datos'.cyan.underline);
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos'.cyan.underline);
        process.exit(1);
    }
}

module.exports = { dataBaseConnection };
