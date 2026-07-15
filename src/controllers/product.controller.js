import productService from '../services/product.service.js';
export default {
  async create(req, res, next) { try { res.status(201).json(await productService.createProduct(req.body)); } catch (e) { next(e); } },
  async list(_req, res, next) { try { res.json(await productService.listProducts()); } catch (e) { next(e); } },
  async get(req, res, next) { try { res.json(await productService.getProduct(req.params.id)); } catch (e) { next(e); } },
  async update(req, res, next) { try { res.json(await productService.updateProduct(req.params.id, req.body)); } catch (e) { next(e); } },
  async remove(req, res, next) { try { await productService.removeProduct(req.params.id); res.status(204).end(); } catch (e) { next(e); } },
};
