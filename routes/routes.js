import { Router } from 'express';
import * as customerService from '../services/customer.service.js';
import * as salesService from '../services/sales.service.js';
import * as purchaseService from '../services/purchase.service.js';
import * as feedbackService from '../services/feedback.service.js';

const router = Router();

router.get('/customer', customerService.index);
router.post('/customer', customerService.insert);
// router.post('/', salesService.insert);
// router.post('/', purchaseService.insert);

export default router;
