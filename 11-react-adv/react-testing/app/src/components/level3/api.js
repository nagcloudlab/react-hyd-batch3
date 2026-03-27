// API module — separated so it can be mocked in tests
export async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
