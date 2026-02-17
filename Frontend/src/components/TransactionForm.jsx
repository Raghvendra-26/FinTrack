import { useState } from "react";
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

const TransactionForm = () => {
  const { addTransaction } = useTransactions();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      type: "expense",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-5 font-bold text-lg">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount ₹"
          value={form.amount}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        />

        <button
          disabled={loading}
          className="w-full gradient-primary rounded-xl py-2 text-white font-semibold"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
