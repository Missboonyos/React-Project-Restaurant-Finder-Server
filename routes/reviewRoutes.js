const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.post('/:restaurant_id', reviewController.addReview)
router.put('/:review_id', reviewController.updateReview)
router.delete('/:review_id', reviewController.deleteReview)

module.exports = router;