import { Router } from 'express';
import controller from '../controllers/stock-movement.controller.js';
import { requireRole } from '../middlewares/auth-middleware.js';
const router = Router();
router.post('/movimentacoes', requireRole('ADMIN'), controller.create);
export default router;
