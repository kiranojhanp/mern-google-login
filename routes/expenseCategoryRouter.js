const express = require("express");
const router = express.Router();
const {
  getExpensesByCategory,
  createExpenseByCategory,
} = require("../controllers/expenseCategoryController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, getExpensesByCategory)
  .post(protect, createExpenseByCategory);

module.exports = router;
