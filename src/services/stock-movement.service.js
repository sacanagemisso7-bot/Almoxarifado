import movementRepo from '../repositories/stock-movement.repository.js';
import productRepo from '../repositories/product.repository.js';
import createError from '../utils/app-error.js';

export default {
  async createStockMovement(data, userId) {
    const productId = data.productId;
    const type = data.type?.trim().toUpperCase();
    const quantity = Number(data.quantity);
    const reason = data.reason?.trim();

    if (!productId) throw createError('Produto é obrigatório.', 400);
    if (!['ENTRADA', 'SAIDA'].includes(type)) throw createError('Tipo deve ser ENTRADA ou SAIDA.', 400);
    if (!Number.isInteger(quantity) || quantity <= 0) throw createError('Quantidade deve ser um inteiro maior que zero.', 400);
    if (!reason) throw createError('Motivo é obrigatório.', 400);

    const product = await productRepo.findById(productId);
    if (!product) throw createError('Produto não encontrado.', 404);

    const delta = type === 'ENTRADA' ? quantity : -quantity;
    const updatedProduct = await productRepo.changeStock(productId, delta);
    if (!updatedProduct) throw createError('Saldo insuficiente para realizar a saída.', 400);

    try {
      const movement = await movementRepo.create({
        productId,
        userId,
        type,
        quantity,
        reason,
        balanceAfter: updatedProduct.stock,
      });
      return movement.populate([
        { path: 'productId', select: 'name code category' },
        { path: 'userId', select: 'name email role' },
      ]);
    } catch (error) {
      await productRepo.changeStock(productId, -delta);
      throw error;
    }
  },
};
