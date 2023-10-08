import { Schema, model } from 'mongoose'

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: Buffer,
  },
});

export default model('Product', productSchema);