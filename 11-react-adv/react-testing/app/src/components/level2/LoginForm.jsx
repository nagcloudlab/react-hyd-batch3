// LEVEL 2 — Form Submission
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return <p>Welcome, {username}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
