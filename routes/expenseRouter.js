const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
  getExpensesByDate,
} = require("../controllers/expenseController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getExpenses).post(protect, createExpense);

router.route("/byDate").get(protect, getExpensesByDate);


router
  .route("/:id")
  .get(protect, getExpenseById)
  .put(protect, updateExpense)
  .delete(protect, deleteExpenseById);


module.exports = router;
