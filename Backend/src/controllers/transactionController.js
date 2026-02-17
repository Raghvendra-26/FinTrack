const Transaction = require("../models/transactions.model");

// Create transaction
async function createTransaction(req, res) {
  const { type, amount, category, description, date } = req.body;

  // Validate fields
  if (!type || !amount || !category) {
    return res.status(400).json({
      success: false,
      message: "Type, amount, and category are required",
    });
  }

  // Amount must be greater than 0
  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than 0",
    });
  }

  // Validate transaction type
  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Transaction type must be income or expense",
    });
  }

  try {
    // Create transaction
    const newTransaction = await Transaction.create({
      userId: req.user._id,
      type,
      amount,
      category,
      description,
      date: date || Date.now(),
    });
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      newTransaction,
    });
  } catch (error) {
    console.error("Error while creating transaction", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating transaction",
    });
  }
}

// Get all transaction
async function getTransactions(req, res) {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error while fetching transactions", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching transactions",
    });
  }
}

// Update transactions
async function updateTransaction(req, res) {
  const transactionId = req.params.id;
  const { type, amount, category, description, date } = req.body;

  try {
    // Find existing transaction
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // update required fields
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    // Save updated fields
    const updatedTransaction = await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while updating transaction",
    });
  }
}

// Delete transaction
async function deleteTransaction(req, res) {
  const transactionId = req.params.id;
  try {
    // Find if transaction exists and delete
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId: req.user._id,
    });

    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while deleting transaction",
    });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
