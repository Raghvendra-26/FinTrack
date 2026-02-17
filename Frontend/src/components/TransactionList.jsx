import { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { Pencil, Trash2, Search } from "lucide-react";
import EditTransactionModal from "./EditTransactionModal";

const TransactionList = () => {
  const { transactions, loading, fetchTransactions, deleteTransaction } =
    useTransactions();

  const [editing, setEditing] = useState(null);

  // ✅ Search + Filters State
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Unique Categories from transactions
  const categories = ["all", ...new Set(transactions.map((tx) => tx.category))];

  // ✅ Filter Logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" ? true : tx.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" ? true : tx.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-bold text-lg">Transactions</h2>

        {/* ✅ Search + Filters UI */}
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border px-9 py-2 text-sm focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-xl border px-4 py-2 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No matching transactions found.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx._id}
                className={`flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50 ${
                  tx.type === "income" ? "border-green-200" : "border-red-200"
                }`}
              >
                {/* Left */}
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>

                  <p className="text-xs text-gray-500">
                    {tx.category} · {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Amount */}
                <p
                  className={`font-semibold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(tx)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteTransaction(tx._id)}
                    className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
};

export default TransactionList;
