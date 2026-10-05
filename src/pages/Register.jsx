import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) return setError("All fields are required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Cannot reach the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Budget Buddy</h2><p className="subtitle">Create your account</p>
        {error && <p className="error" role="alert">{error}</p>}
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={onChange} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

