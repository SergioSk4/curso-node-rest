const express = require('express');
const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //Routes of the app
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());


        //Body parse and reading
        this.app.use(express.json());
        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}

module.exports = Server;