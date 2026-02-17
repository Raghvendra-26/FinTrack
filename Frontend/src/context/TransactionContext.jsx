import { createContext, useContext, useState, useCallback } from "react";
import API from "../api/axios";
import { toast } from "sonner";

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Transactions
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data.transactions);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add Transaction
  const addTransaction = async (data) => {
    try {
      await API.post("/transactions", data);
      toast.success("Transaction added!");
      fetchTransactions();
    } catch {
      toast.error("Transaction add failed");
    }
  };

  // Update Transaction
  const updateTransaction = async (id, data) => {
    try {
      await API.patch(`/transactions/${id}`, data);
      toast.success("Transaction updated!");
      fetchTransactions();
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      toast.success("Transaction deleted!");
      fetchTransactions();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
