import { Router } from 'express';
import * as category from '../controllers/category';
import { checkPermission } from '../middlewares/permission';

const router = Router();

// CRUD category
router.get('/', category.getAllCategory);

router.get('/:categoryId', category.getCategoryById);

router.post('/', checkPermission, category.createCategory);

router.put('/', checkPermission, category.updateCategory);

router.delete('/', checkPermission, category.deleteCategory);

export default router;
