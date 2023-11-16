import express from "express";
import cors from "cors";
import { dbConnection } from "../helpers/database.js";
import { env } from "custom-env";
import routerProducts from "../routes/products.js";
import routerAuth from "../routes/auth.js";
import multer from "multer";
env();

const app = express();

// db
await dbConnection();

// CORS
app.use(cors());
app.options("*", cors());
//Lectura y parseo del body
//app.use(express.json());
app.use(express.json({ limit: "50mb" }));

// routes
const inMemoryStorage = multer.memoryStorage();
const upload = multer({ storage: inMemoryStorage });
app.use("/products", upload.single("image"), routerProducts);
app.use("/login", upload.none(), routerAuth);

export default app;
