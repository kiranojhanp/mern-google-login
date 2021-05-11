const express = require("express");
const router = express.Router();
const {
  getExpensesByCategory,
  createExpenseByCategory,
  getCategoryById,
  updateCategoryById,
  getExpensesByCategoryId,
} = require("../controllers/expenseCategoryController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, getExpensesByCategory)
  .post(protect, createExpenseByCategory);

router
  .route("/:id")
  .get(protect, getCategoryById)
  .put(protect, updateCategoryById);

router.route("/:id/expenses").get(protect, getExpensesByCategoryId);

module.exports = router;
