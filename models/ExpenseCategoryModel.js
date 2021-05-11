const mongoose = require("mongoose");

const expenseCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "attach-money",
    required: true,
  },
  color: {
    type: String,
    default: "#f66",
    required: true,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

const Expense = mongoose.model("ExpenseCategory", expenseCategorySchema);
module.exports = Expense;
