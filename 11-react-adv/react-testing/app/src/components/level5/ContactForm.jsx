// LEVEL 5 — Complete User Flow (Form → API → Success/Error)
import { useState } from "react";
import { submitContact } from "./contactApi";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  if (status === "success") {
    return (
      <div>
        <p>Thank you! Your message has been sent.</p>
        <button onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={form.email} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} />
      </div>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && <p>Error: {errorMsg}</p>}
    </form>
  );
}
