import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import * as inventoryController from "../controllers/inventory.controller.js"

const router = express.Router();
router.get('/', [authMiddleware.verifyToken], inventoryController.getInventory);
router.post('/update', [authMiddleware.verifyToken], inventoryController.updateInventoryItem);

export default router;