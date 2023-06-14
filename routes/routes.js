import { Router } from 'express';
import * as customerService from '../services/customer.service.js';
import * as salesService from '../services/sales.service.js';
import * as purchaseService from '../services/purchase.service.js';
import * as feedbackService from '../services/feedback.service.js';

const router = Router();

router.get('/customer', customerService.index);
router.post('/customer', customerService.insert);
router.get('/sales', salesService.index);
router.post('/sales', salesService.insert);
router.get('/purchase', purchaseService.index);
router.post('/purchase', purchaseService.insert);
router.put('/purchase/:purchase_id', purchaseService.update);

export default router;
