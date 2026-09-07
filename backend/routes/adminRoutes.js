const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  updateUserStatus,
  togglePropertyApproval
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

router.get('/stats', protect, requireAdmin, getAdminStats);
router.get('/users', protect, requireAdmin, getAllUsers);
router.patch('/users/:id', protect, requireAdmin, updateUserStatus);
router.patch('/properties/:id', protect, requireAdmin, togglePropertyApproval);

module.exports = router;
