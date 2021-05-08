// Requires
require('dotenv').config();

// Classes
const Server = require('./models/server');


const server = new Server;

server.listen();