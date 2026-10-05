import { useState } from "react";
import "./Home.css";
import "./Pages.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return setError("Please fill in all fields");
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="home-hero">
        <h1>Contact us</h1>
        <p>Have a question or feedback? Send us a message.</p>
      </section>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <form className="card form" onSubmit={submit}>
          {sent && <p className="income">Thank you! Your message was sent.</p>}
          {error && <p className="error" role="alert">{error}</p>}
          <label htmlFor="cname">Name</label>
          <input id="cname" name="name" value={form.name} onChange={onChange} />
          <label htmlFor="cemail">Email</label>
          <input id="cemail" name="email" type="email" value={form.email} onChange={onChange} />
          <label htmlFor="cmessage">Message</label>
          <textarea id="cmessage" name="message" rows="4" value={form.message} onChange={onChange}
            style={{ padding: ".6rem", border: "1px solid #d1d5db", borderRadius: 8, fontSize: "1rem", fontFamily: "inherit" }} />
          <div className="row">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
