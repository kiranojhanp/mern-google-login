const asyncHandler = require("express-async-handler");
const Expense = require("../models/ExpenseModel");

// @desc  Fetch all user expenses
// @route  GET /api/expenses
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  if (expenses) {
    res.status(200).json(expenses);
  } else {
    res.status(404).json({ error: "Expenses not found" });
  }
});

// @desc  Create single expense
// @route  POST /api/expenses
// @access Private
const createExpense = asyncHandler(async (req, res) => {
  const { title, description, amount, category, expenseDate, status } = req.body;
  const expense = new Expense({
    user: req.user._id,
    title: title,
    description: description,
    amount: amount,
    category: category,
    expenseDate: expenseDate,
    status: status,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
});

// @desc  Fetch single user expense
// @route  GET /api/expense/:id
// @access Private
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(404).json({ error: "Expense not found" });
  }
});

// @desc  Update an expense
// @route  PUT /api/expense/:id
// @access Private
const updateExpense = asyncHandler(async (req, res) => {
  const { title, description, amount, category, expenseDate, status } = req.body;

  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    {
      user: req.user._id,
      title: title,
      description: description,
      amount: amount,
      category: category,
      expenseDate: expenseDate,
      status: status,
    },
    { new: true }
  );
  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(403).json({ error: "Could not update" });
  }
});

// @desc  Delete an expense
// @route  DELETE /api/expense/:id
// @access Private
const deleteExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await expense.remove();
    res.status(200).json({ message: "Expense removed" });
  } else {
    res.status(404).json({ error: "Expense not found" });
  }
});

// GET EXPENSES BY DATE
// @desc  Fetch all user expenses on given date
// @route  GET /api/expenses/byDate
// @access Private
const getExpensesByDate = asyncHandler(async (req, res) => {
  //expected date format: YYY-MMM-DDD
  let { startDate, endDate } = req.query;

  //1. check that date is not empty
  if (startDate === "" || endDate === "") {
    return res.status(400).json({
      status: "failure",
      message: "Please ensure you pick two dates",
    });
  }

  const expenses = await Expense.find({
    expenseDate: {
      $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
    },
  }).sort({ updatedAt: "asc" });

  if (expenses) {
    res.status(200).json(expenses);
  } else {
    res.status(404).json({ error: "No expenses found between this range" });
  }
});

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
  getExpensesByDate,
};
