// LEVEL 1 — Component with Props
export default function Greeting({ name }) {
  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <p>We are glad to have you here.</p>
    </div>
  );
}
