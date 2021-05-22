const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categoria: '/api/categorias',
      producto: '/api/productos',
      usuarios: '/api/usuarios'
    };

    //DB connection
    this.connectDB();

    //Middlewares
    this.middlewares();
    //Routes of the app
    this.routes();
  }
  async connectDB() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.categoria, require('../routes/categorias'));
    this.app.use(this.paths.producto, require('../routes/productos'));
    this.app.use(this.paths.usuarios, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
