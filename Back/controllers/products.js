import { response } from "express";
import Product from "../models/product.js";

const getProducts = async (req, res = response) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res = response) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.file ||
    !req.body.description ||
    !req.body.amount
  ) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const { name, price, description, amount } = req.body;
  const image = req.file.buffer;
  const product = new Product({ name, image, price, description, amount });
  const saved = await product.save();
  //delete saved image
  const retorno = saved.toObject();
  delete retorno.image;
  delete retorno.__v;
  res.json(retorno);
};

const deleteProduct = async (req, res = response) => {
  const id = req.body.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).send({ message: "Product not found with id " + id });
  }
  res.json(product);
};

const updateProduct = async (req, res = response) => {
  const id = req.body.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).send({ message: "Product not found with id " + id });
  }
  if (!req.body.name && !req.body.price) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  let { name, price } = req.body;
  name = name ? name : product.name;
  price = price ? price : product.price;
  product.name = name;
  product.price = price;
  const saved = await product.save();
  //delete saved image
  const retorno = saved.toObject();
  delete retorno.image;
  delete retorno.__v;
  res.json(retorno);
};

//export
export { getProducts, createProduct, deleteProduct, updateProduct };
