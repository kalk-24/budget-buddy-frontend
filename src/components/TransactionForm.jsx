import { useState, useEffect } from "react";

export const CATEGORIES = ["Food", "Rent", "Transportation", "Shopping", "Entertainment", "Salary", "Education", "Other"];
const today = () => new Date().toISOString().slice(0, 10);
const empty = () => ({ description: "", amount: "", type: "Expense", category: "Food", date: today() });

export default function TransactionForm({ editing, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(empty());
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setForm(editing
      ? { description: editing.description, amount: editing.amount, type: editing.type, category: editing.category, date: editing.date.slice(0, 10) }
      : empty());
  }, [editing]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.description.trim()) return setError("Description is required");
    if (!(Number(form.amount) > 0)) return setError("Amount must be greater than 0");
    if (!form.date) return setError("Date is required");
    try {
      await onSubmit({ ...form, amount: Number(form.amount) });
      if (!editing) setForm(empty());
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>{editing ? "Edit transaction" : "Add transaction"}</h3>
      {error && <p className="error" role="alert">{error}</p>}
      <label htmlFor="type">Type</label>
      <select id="type" name="type" value={form.type} onChange={onChange}>
        <option>Income</option>
        <option>Expense</option>
      </select>
      <label htmlFor="description">Description</label>
      <input id="description" name="description" value={form.description} onChange={onChange} />
      <label htmlFor="amount">Amount</label>
      <input id="amount" name="amount" type="number" step="0.01" value={form.amount} onChange={onChange} />
      <label htmlFor="category">Category</label>
      <select id="category" name="category" value={form.category} onChange={onChange}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <label htmlFor="date">Date</label>
      <input id="date" name="date" type="date" value={form.date} onChange={onChange} />
      <div className="row">
        <button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Add"}</button>
        {editing && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
