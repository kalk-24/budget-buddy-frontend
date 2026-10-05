import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../services/api";
import "./Pages.css";

const COLORS = ["#7c3aed", "#db2777", "#f59e0b", "#16a34a", "#06b6d4", "#6366f1", "#f43f5e", "#84cc16"];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/summary")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load the dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Loading...</p>;
  if (error) return <p className="error" role="alert">{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card stat"><span className="muted">Total income</span><strong className="income">{data.totalIncome.toFixed(2)}</strong></div>
        <div className="card stat"><span className="muted">Total expenses</span><strong className="expense">{data.totalExpenses.toFixed(2)}</strong></div>
        <div className="card stat"><span className="muted">Balance</span><strong style={{ color: data.balance < 0 ? "#dc2626" : "#16a34a" }}>{data.balance.toFixed(2)}</strong></div>
      </div>
      <div className="dash-grid">
        <div className="card">
          <h3>Spending by category</h3>
          {data.expensesByCategory.length === 0 ? (
            <p className="muted">No expenses yet.</p>
          ) : (
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data.expensesByCategory} dataKey="total" nameKey="category" outerRadius={90}>
                    {data.expensesByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="card">
          <h3>Recent transactions</h3>
          {data.recentTransactions.length === 0 && <p className="muted">No transactions yet.</p>}
          {data.recentTransactions.map((t) => (
            <div className="tx-row recent" key={t._id}>
              <div>
                <strong>{t.description}</strong>
                <small>{t.category} &middot; {t.date.slice(0, 10)}</small>
              </div>
              <span className={t.type === "Income" ? "income" : "expense"}>
                {t.type === "Income" ? "+" : "-"}{t.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
