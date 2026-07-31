const router = require('express').Router();
const { getMenu, addItem, updateItem, deleteItem } = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/auth');

router.get ('/',    getMenu);
router.post('/',    protect, adminOnly, addItem);
router.put ('/:id', protect, adminOnly, updateItem);
router.delete('/:id', protect, adminOnly, deleteItem);

module.exports = router;
