import { useState } from "react";
import { X } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

const EditTransactionModal = ({ transaction, onClose }) => {
  const { updateTransaction } = useTransactions();

  const [form, setForm] = useState({
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date.split("T")[0],
    description: transaction.description,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTransaction(transaction._id, {
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-green-200 outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-lg">Edit Transaction</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
            placeholder="Description"
          />

          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className={inputClass}
            placeholder="Amount ₹"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
          />

          <button className="w-full rounded-xl bg-green-500 py-2.5 text-white font-semibold hover:bg-green-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
