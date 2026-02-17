const SummaryCards = ({ income, expense, balance }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card title="Income" value={income} type="income" />
      <Card title="Expenses" value={expense} type="expense" />
      <Card title="Balance" value={balance} type="balance" />
    </section>
  );
};

const Card = ({ title, value, type }) => {
  const styles = {
    income: "border-green-200 bg-green-50 text-green-700",
    expense: "border-red-200 bg-red-50 text-red-700",
    balance: "border-gray-900 bg-white text-gray-900",
  };

  return (
    <div className={`p-5 rounded-2xl shadow-sm border ${styles[type]}`}>
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">₹{value.toFixed(2)}</h2>
    </div>
  );
};

export default SummaryCards;
