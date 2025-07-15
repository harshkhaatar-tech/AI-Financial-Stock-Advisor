const express = require('express');
const router = express.Router();
const {
  getFundamentals,
  getTechnicals,
  getRecommendation
} = require('../controllers/stock.controller');

router.get('/:symbol/fundamentals', getFundamentals);
router.get('/:symbol/technicals', getTechnicals);
router.get('/:symbol/recommendation', getRecommendation);

module.exports = router;