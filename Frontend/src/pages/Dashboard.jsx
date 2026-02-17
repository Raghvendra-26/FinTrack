import DashboardNavbar from "../components/DashboardNavbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SummaryCards from "../components/SummaryCards";
import { useTransactions } from "../context/TransactionContext";

const Dashboard = () => {
  const { transactions } = useTransactions();

  // Calculate summary
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Summary Cards */}
        <SummaryCards income={income} expense={expense} balance={balance} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Form */}
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>

          {/* Right Transactions */}
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
