const asyncHandler = require("express-async-handler");
const ExpenseCategory = require("../models/ExpenseCategoryModel");

// @desc  Fetch all expenses according to category
// @route  GET /api/category
// @access Private
const getExpensesByCategory = asyncHandler(async (req, res) => {
  const expenses = await ExpenseCategory.find();
  if (expenses) {
    res.status(200).json(expenses);
  } else {
    res.status(404).json({ error: "Expenses not found" });
  }
});

// @desc  Create single expense category
// @route  POST /api/category
// @access Private
const createExpenseByCategory = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body;
  const expense = new ExpenseCategory({
    name: name,
    icon: icon,
    color: color,
  });

  const createdExpenseByCategory = await expense.save();
  res.status(201).json(createdExpenseByCategory);
});

module.exports = { getExpensesByCategory, createExpenseByCategory };
