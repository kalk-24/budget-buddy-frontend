import "./Home.css";

export default function About() {
  return (
    <div>
      <section className="home-hero">
        <h1>About Budget Buddy</h1>
        <p>Budget Buddy is a simple personal finance app that helps you understand your spending. You can record every income and expense, group them by category, set monthly budgets, and view a clear summary on your dashboard.</p>
      </section>
      <section className="home-features">
        <div className="home-card"><h3>Our goal</h3><p>Make budgeting easy and clear for everyone.</p></div>
        <div className="home-card"><h3>Your data</h3><p>Every account is private. You only see your own transactions.</p></div>
        <div className="home-card"><h3>Technology</h3><p>Built with React, Node.js, Express and MongoDB.</p></div>
      </section>
    </div>
  );
}
