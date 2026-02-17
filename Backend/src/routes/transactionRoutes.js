const express = require("express");

const protect = require("../middlewares/authMiddleware");
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// POST -> create transaction
router.post("/", protect, createTransaction);

// GET -> get all transactions
router.get("/", protect, getTransactions);

// PATCH -> update transaction
router.patch("/:id", protect, updateTransaction);

// DELETE -> delete transaction
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
