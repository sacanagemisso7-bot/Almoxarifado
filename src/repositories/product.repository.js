import Product from '../models/product.model.js';

export default {
  create: (data) => Product.create(data),
  findAll: () => Product.find().sort({ name: 1 }),
  findById: (id) => Product.findById(id),
  findByCode: (code) => Product.findOne({ code }),
  updateById: (id, data) => Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id) => Product.findByIdAndDelete(id),
  changeStock: (id, delta) => Product.findOneAndUpdate(
    { _id: id, stock: { $gte: Math.max(0, -delta) } },
    { $inc: { stock: delta } },
    { new: true, runValidators: true }
  ),
};
