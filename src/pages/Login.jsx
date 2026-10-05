import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("Email and password are required");
    setLoading(true);
    try {
      await login(form.email, form.password);
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
        <h2>Budget Buddy</h2><p className="subtitle">Sign in to your account</p>
        {error && <p className="error" role="alert">{error}</p>}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <p>No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

