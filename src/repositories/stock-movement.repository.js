import StockMovement from '../models/stock-movement.model.js';

export default {
  create: (data) => StockMovement.create(data),
  findAll: () => StockMovement.find()
    .populate('productId', 'name code category')
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 }),
  existsForProduct: (productId) => StockMovement.exists({ productId }),
};
