import service from '../services/stock-movement.service.js';
export default {
  async create(req, res, next) { try { res.status(201).json(await service.createStockMovement(req.body, req.user.id)); } catch (e) { next(e); } },
};
