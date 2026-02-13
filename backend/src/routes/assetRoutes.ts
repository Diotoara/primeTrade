import { Router } from 'express';
import { createAsset, deleteAsset, getAssets } from '../controllers/assetController';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// GET /api/v1/assets - Both Users (see own) and Admins (see all)
router.get('/', authenticate, getAssets);

// POST /api/v1/assets - Any logged-in user can add an asset
router.post('/', authenticate, createAsset);

// DELETE /api/v1/assets/:id - ONLY Admins can delete assets (RBAC demonstration)
router.delete('/:id', authenticate, authorize(['admin']), deleteAsset);

export default router;