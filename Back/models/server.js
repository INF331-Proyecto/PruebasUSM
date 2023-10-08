
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { dbConnection } from '../helpers/database.js'
import { env } from "custom-env";
import routerProducts from "../routes/products.js"
env();

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.server = createServer(this.app);

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas API
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  };

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Parseo de application/x-www-form-urlencoded
    //this.app.use(express.urlencoded({ extended: true }));
    

  }

  routes() {

    // Rutas API
    this.app.use('/products', routerProducts)
    //this.app.use('/api/campaigns', upload.single('file'), require('../routes/campaigns'));
  }

  listen() {
      this.server.listen(this.port, () => {
      console.log(`Servidor: Online - Puerto ${this.port} `);
		});
	}
}

export default Server;
