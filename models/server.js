const express = require('express');
const color = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');  
const { dataBaseConnection } = require('../db/database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.moviesPath = '/movies';
        this.tareasPath = '/tareas';
        this.usersPath = '/users';
        this.dataBaseConnection();
        this.middlewares();
        this.routes()
    }
    async dataBaseConnection() {
        await dataBaseConnection();
    }

    middlewares() {
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
    } 
    routes() {
        this.app.use(this.moviesPath, require('../routes/movies'));
        this.app.use(this.tareasPath, require('../routes/tareas'));
        this.app.use(this.usersPath, require('../routes/users'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

   
}

module.exports = Server;