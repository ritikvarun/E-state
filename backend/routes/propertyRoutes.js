const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, createProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
