import express from 'express';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router()

router.route('/movie/:id').get(ReviewsCtrl.apiGetReviews) // : makes id a variable
router.route('/new').post(ReviewsCtrl.apiPostReview)
router.route('/:id')
  .get(ReviewsCtrl.apiGetReview) // if get command, then run function apiGetReview
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router