import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Auth from "../context/AuthContext";
import api from "../services/api";
import "./Home.css";

const COLORS = ["#7459e6", "#55a7e8", "#e69a55", "#35a25b"];
const DOTS = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
const fmt = (n) =>
  Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Home() {
  const auth = (Auth.useAuth ? Auth.useAuth() : null) || {};

  let loggedIn = Boolean(auth.user || auth.token);
  if (!loggedIn) {
    try {
      loggedIn = Object.keys(localStorage).some((k) => k.toLowerCase().includes("token"));
    } catch {
      loggedIn = false;
    }
  }

  const [showAmounts, setShowAmounts] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      setSummary(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");
    api.get("/summary")
      .then((res) => { if (!cancelled) setSummary(res.data); })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.status === 401
            ? "Your session expired. Please log in again."
            : "Could not load your overview.");
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [loggedIn]);

  const top = summary ? summary.expensesByCategory.slice(0, 4) : [];
  const negative = summary ? summary.balance < 0 : false;

  return (
    <main className="home-page">

      {/* Hero section */}
      <section className="home-hero">

        {/* Left side: main message */}
        <div className="hero-content">

          <div className="hero-badge">
            Personal finance, simplified
          </div>

          <h1>
            Know where your money goes.
            <span> Plan where it goes next.</span>
          </h1>

          <p className="hero-description">
            Track your income and expenses, set monthly budgets,
            and understand your spending &mdash; all in one simple place.
          </p>

          <div className="hero-actions">
            {loggedIn ? (
              <>
                <Link to="/dashboard" className="primary-button">
                  Go to Dashboard
                </Link>
                <Link to="/transactions" className="secondary-button">
                  Add a transaction
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="primary-button">
                  Get started free
                </Link>
                <Link to="/login" className="secondary-button">
                  I already have an account
                </Link>
              </>
            )}
          </div>

          <div className="hero-trust">
            <div><span className="trust-icon">{"\u2713"}</span>Simple to use</div>
            <div><span className="trust-icon">{"\u2713"}</span>Private by design</div>
            <div><span className="trust-icon">{"\u2713"}</span>Built for everyday money</div>
          </div>

        </div>


        {/* Right side: your real overview */}
        <div className="hero-preview">

          <div className="finance-card">

            <div className="finance-card-header">
              <div>
                <p className="small-label">{loggedIn ? "All time" : "Your account"}</p>
                <h3>Your overview</h3>
              </div>
              <div className="status-dot"></div>
            </div>

            {/* Not logged in */}
            {!loggedIn && (
              <div className="balance-section" style={{ textAlign: "center" }}>
                <p style={{ fontSize: 15, marginBottom: 16 }}>
                  Log in to see your balance, income, expenses and spending.
                </p>
                <div className="hero-actions" style={{ justifyContent: "center", marginTop: 0 }}>
                  <Link to="/login" className="primary-button">Login</Link>
                  <Link to="/register" className="secondary-button">Register</Link>
                </div>
              </div>
            )}

            {/* Logged in: loading */}
            {loggedIn && loading && (
              <div className="balance-section">
                <p>Loading your overview...</p>
              </div>
            )}

            {/* Logged in: error */}
            {loggedIn && !loading && error && (
              <div className="balance-section">
                <p style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</p>
                <Link to="/login" className="secondary-button">Go to Login</Link>
              </div>
            )}

            {/* Logged in: real data */}
            {loggedIn && !loading && !error && summary && (
              <>
                <div className="balance-section">
                  <div className="balance-heading">
                    <p>Total balance</p>
                    <button
                      type="button"
                      className="visibility-button"
                      onClick={() => setShowAmounts((previous) => !previous)}
                      aria-label={showAmounts ? "Hide amounts" : "Show amounts"}
                      aria-pressed={showAmounts}
                    >
                      {"\uD83D\uDC41\uFE0F"}
                    </button>
                  </div>
                  <h2 style={negative && showAmounts ? { color: "#d65c5c" } : undefined}>
                    {showAmounts ? fmt(summary.balance) : DOTS + "\u2022\u2022"}
                  </h2>
                  <span className="balance-change">Income minus expenses</span>
                </div>

                <div className="money-stats">
                  <div className="money-stat income-stat">
                    <div className="stat-icon">{"\u2193"}</div>
                    <div>
                      <p>Income</p>
                      <strong>{showAmounts ? fmt(summary.totalIncome) : DOTS}</strong>
                    </div>
                  </div>
                  <div className="money-stat expense-stat">
                    <div className="stat-icon">{"\u2191"}</div>
                    <div>
                      <p>Expenses</p>
                      <strong>{showAmounts ? fmt(summary.totalExpenses) : DOTS}</strong>
                    </div>
                  </div>
                </div>

                <div className="spending-section">
                  <div className="section-heading">
                    <div>
                      <p className="small-label">Spending</p>
                      <h4>By category</h4>
                    </div>
                    <span>All time</span>
                  </div>

                  {top.length === 0 && (
                    <p className="small-label">
                      No expenses yet. <Link to="/transactions">Add your first transaction</Link>
                    </p>
                  )}

                  {top.map((c, i) => {
                    const pct = summary.totalExpenses > 0 ? (c.total / summary.totalExpenses) * 100 : 0;
                    return (
                      <div className="spending-item" key={c.category}>
                        <div className="spending-info">
                          <span className="category-dot" style={{ background: COLORS[i % COLORS.length] }}></span>
                          <span>{c.category}</span>
                          <strong>{showAmounts ? fmt(c.total) : DOTS}</strong>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: pct + "%", background: COLORS[i % COLORS.length] }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>

        </div>

      </section>


      {/* Features section */}
      <section className="features-section">

        <div className="features-heading">
          <p className="section-label">Everything in one place</p>
          <h2>Make your money easier to understand.</h2>
          <p>
            Budget Buddy gives you the tools to build better
            spending habits without making finance complicated.
          </p>
        </div>

        <div className="features-grid">

          <article className="feature-card">
            <div className="feature-icon transaction-icon">$</div>
            <h3>Track transactions</h3>
            <p>
              Record your income and expenses and organize
              them by category, type, and date.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon budget-icon">%</div>
            <h3>Set monthly budgets</h3>
            <p>
              Create spending limits for categories and see
              how much you have used and how much remains.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon insight-icon">{"\u2197"}</div>
            <h3>Understand your spending</h3>
            <p>
              Use your dashboard and charts to see where
              your money is going and make better decisions.
            </p>
          </article>

        </div>

      </section>


      {/* Bottom call-to-action */}
      <section className="home-cta">

        <div>
          <p className="section-label">Ready to start?</p>
          <h2>Give your money a clearer direction.</h2>
          <p>Start tracking your finances today with Budget Buddy.</p>
        </div>

        {loggedIn ? (
          <Link to="/dashboard" className="cta-button">Open your dashboard</Link>
        ) : (
          <Link to="/register" className="cta-button">Create your account</Link>
        )}

      </section>

    </main>
  );
}

export default Home;
