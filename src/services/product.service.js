import repo from '../repositories/product.repository.js';
import movementRepo from '../repositories/stock-movement.repository.js';
import createError from '../utils/app-error.js';

function normalize(data, partial = false) {
  const payload = {};
  const required = ['name', 'code', 'description', 'price', 'category'];
  if (!partial && required.some((key) => data[key] === undefined || data[key] === '')) {
    throw createError('Nome, código, descrição, preço e categoria são obrigatórios.', 400);
  }
  if ('stock' in data) throw createError('O saldo só pode ser alterado por movimentações.', 400);
  if (data.name !== undefined) payload.name = data.name.trim();
  if (data.code !== undefined) payload.code = data.code.trim().toUpperCase();
  if (data.description !== undefined) payload.description = data.description.trim();
  if (data.category !== undefined) payload.category = data.category.trim();
  if (data.price !== undefined) {
    const price = Number(data.price);
    if (!Number.isFinite(price) || price < 0) throw createError('Preço inválido.', 400);
    payload.price = price;
  }
  return payload;
}

export default {
  async createProduct(data) {
    const payload = normalize(data);
    if (await repo.findByCode(payload.code)) throw createError('Código de produto já cadastrado.', 400);
    return repo.create(payload);
  },
  listProducts: () => repo.findAll(),
  async getProduct(id) {
    const product = await repo.findById(id);
    if (!product) throw createError('Produto não encontrado.', 404);
    return product;
  },
  async updateProduct(id, data) {
    const payload = normalize(data, true);
    if (!Object.keys(payload).length) throw createError('Nenhum campo válido informado.', 400);
    if (payload.code) {
      const existing = await repo.findByCode(payload.code);
      if (existing && existing.id !== id) throw createError('Código de produto já cadastrado.', 400);
    }
    const product = await repo.updateById(id, payload);
    if (!product) throw createError('Produto não encontrado.', 404);
    return product;
  },
  async removeProduct(id) {
    const product = await repo.findById(id);
    if (!product) throw createError('Produto não encontrado.', 404);
    if (product.stock !== 0) throw createError('Só é possível excluir produtos com saldo zero.', 400);
    if (await movementRepo.existsForProduct(id)) throw createError('Não é possível excluir produto com histórico de movimentações.', 400);
    await repo.deleteById(id);
  },
};
