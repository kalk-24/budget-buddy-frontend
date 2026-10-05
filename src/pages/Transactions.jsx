import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import TransactionForm, { CATEGORIES } from "../components/TransactionForm";
import "./Pages.css";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ type: "", category: "", from: "", to: "" });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const { data } = await api.get("/transactions", { params });
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load transactions");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const save = async (body) => {
    setSaving(true);
    try {
      if (editing) await api.patch("/transactions/" + editing._id, body);
      else await api.post("/transactions", body);
      setEditing(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (t) => {
    if (!window.confirm('Delete "' + t.description + '"?')) return;
    try {
      await api.delete("/transactions/" + t._id);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete");
    }
  };

  const setF = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Transactions</h2>
      <div className="tx-layout">
        <TransactionForm editing={editing} onSubmit={save} onCancel={() => setEditing(null)} saving={saving} />
        <div className="card">
          <div className="filters">
            <select name="type" value={filters.type} onChange={setF} aria-label="Filter by type">
              <option value="">All types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
            <select name="category" value={filters.category} onChange={setF} aria-label="Filter by category">
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input name="from" type="date" value={filters.from} onChange={setF} aria-label="From date" />
            <input name="to" type="date" value={filters.to} onChange={setF} aria-label="To date" />
          </div>
          {loading && <p className="muted">Loading...</p>}
          {error && <p className="error" role="alert">{error}</p>}
          {!loading && !error && items.length === 0 && <p className="muted">No transactions found.</p>}
          {items.map((t) => (
            <div className="tx-row" key={t._id}>
              <div>
                <strong>{t.description}</strong>
                <small>{t.category} &middot; {t.date.slice(0, 10)}</small>
              </div>
              <span className={t.type === "Income" ? "income" : "expense"}>
                {t.type === "Income" ? "+" : "-"}{t.amount.toFixed(2)}
              </span>
              <div className="row">
                <button className="secondary" onClick={() => setEditing(t)}>Edit</button>
                <button className="danger" onClick={() => remove(t)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
