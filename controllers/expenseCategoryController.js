const asyncHandler = require("express-async-handler");
const ExpenseCategory = require("../models/ExpenseCategoryModel");

// @desc  Fetch all expenses according to category
// @route  GET /api/category
// @access Private
const getExpensesByCategory = asyncHandler(async (req, res) => {
  const categories = await ExpenseCategory.find().populate("expenses");
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ error: "Categories not found" });
  }
});

// @desc  Create single expense category
// @route  POST /api/category
// @access Private
const createExpenseByCategory = asyncHandler(async (req, res) => {
  const { name, icon, color, expenses } = req.body;
  const expense = new ExpenseCategory({
    name: name,
    icon: icon,
    color: color,
    expenses: expenses,
  });

  const createdExpenseByCategory = await expense.save();
  res.status(201).json(createdExpenseByCategory);
});

// @desc  Fetch single expense according to category id
// @route  GET /api/category/:id
// @access Private
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await ExpenseCategory.findById(req.params.id).populate(
    "expenses"
  );
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

// @desc  Update single expense according to category id
// @route  PUT /api/category/:id
// @access Private
const updateCategoryById = asyncHandler(async (req, res) => {
  const { name, icon, color, expenses } = req.body;
  const category = await ExpenseCategory.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: name, icon: icon, color: color, expenses: expenses },
    },
    { new: true }
  );
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

// @desc  Fetch all expenses according to category id
// @route  GET /api/category/:id/expenses
// @access Private
const getExpensesByCategoryId = asyncHandler(async (req, res) => {
  const expenses = await ExpenseCategory.findById(req.params.id).populate(
    "expenses"
  );
  if (expenses) {
    res.status(200).json(expenses.expenses);
  } else {
    res.status(404).json({ error: "Expenses not found" });
  }
});

module.exports = {
  getExpensesByCategory,
  createExpenseByCategory,
  getCategoryById,
  updateCategoryById,
  getExpensesByCategoryId,
};
