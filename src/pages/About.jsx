import { Link } from "react-router-dom";
import "./About.css";

const Icon = ({ children }) => (
  <svg
    className="ab-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const principles = [
  {
    title: "Our goal",
    text: "Make budgeting easy and clear for everyone, so you spend less time counting and more time deciding.",
  },
  {
    title: "Your data",
    text: "Every account is private. You only see your own transactions, and nobody else can open them.",
  },
  {
    title: "Simple by design",
    text: "No jargon and no clutter. Add a transaction, pick a category, and see the result right away.",
  },
];

const features = [
  {
    title: "Record every transaction",
    text: "Log income and expenses in seconds and edit them any time.",
    icon: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <path d="M3 6h.01M3 12h.01M3 18h.01" />
      </>
    ),
  },
  {
    title: "Group by category",
    text: "Sort spending into food, transport, rent and more to see where it goes.",
    icon: (
      <>
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Set monthly budgets",
    text: "Give each category a limit and watch how much of it you have used.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    title: "Read your summary",
    text: "Your dashboard shows income, expenses and balance in one clear view.",
    icon: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M18 17V9M13 17V5M8 17v-3" />
      </>
    ),
  },
];

const steps = [
  { title: "Create your account", text: "Sign up with your email. It takes less than a minute." },
  { title: "Add what you earn and spend", text: "Enter transactions and choose a category for each one." },
  { title: "Check your dashboard", text: "See your balance and budgets update as you go." },
];

const stack = ["React", "Node.js", "Express", "MongoDB"];

export default function About() {
  return (
    <main className="ab">
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-hero-copy">
          <h1>Budgeting that shows you where your money goes.</h1>
          <p>
            Budget Buddy is a simple personal finance app. Record every income and expense, group
            them by category, set monthly budgets, and read a clear summary on your dashboard.
          </p>
          <div className="ab-actions">
            <Link to="/register" className="ab-btn ab-btn-primary">
              Create free account
            </Link>
            <Link to="/contact" className="ab-btn ab-btn-ghost">
              Contact us
            </Link>
          </div>
        </div>

        <aside className="ab-ledger" aria-label="Sample month preview">
          <div className="ab-ledger-head">
            <span>Sample month</span>
            <span className="ab-ledger-tag">Preview</span>
          </div>
          <ul className="ab-ledger-rows">
            <li>
              <span>Salary</span>
              <b className="pos">+ 25,000</b>
            </li>
            <li>
              <span>Rent</span>
              <b className="neg">− 8,000</b>
            </li>
            <li>
              <span>Groceries</span>
              <b className="neg">− 4,200</b>
            </li>
            <li>
              <span>Transport</span>
              <b className="neg">− 1,500</b>
            </li>
          </ul>
          <div className="ab-ledger-total">
            <span>Balance</span>
            <strong>11,300 ETB</strong>
          </div>
          <div className="ab-budget">
            <div className="ab-budget-label">
              <span>Food budget</span>
              <span>4,200 of 6,000</span>
            </div>
            <div className="ab-bar" role="img" aria-label="70 percent of food budget used">
              <i style={{ width: "70%" }} />
            </div>
          </div>
        </aside>
      </section>

      {/* Principles */}
      <section className="ab-section">
        <h2>What we stand for</h2>
        <div className="ab-rows">
          {principles.map((p) => (
            <div className="ab-row" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="ab-section">
        <h2>Everything you need to stay on top of your money</h2>
        <div className="ab-features">
          {features.map((f) => (
            <article className="ab-feature" key={f.title}>
              <span className="ab-feature-icon">
                <Icon>{f.icon}</Icon>
              </span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="ab-section">
        <h2>How it works</h2>
        <ol className="ab-steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="ab-step-n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Technology */}
      <section className="ab-section ab-tech">
        <div>
          <h2>Built with modern tools</h2>
          <p>A React front end talks to a Node.js and Express API, with your data stored in MongoDB.</p>
        </div>
        <ul className="ab-chips">
          {stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <h2>Ready to see where your money goes?</h2>
        <p>Create an account and add your first transaction today.</p>
        <Link to="/register" className="ab-btn ab-btn-light">
          Create free account
        </Link>
      </section>
    </main>
  );
}