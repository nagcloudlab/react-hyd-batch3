import Footer from "./components/Footer";
import Input from "./components/Input";
import List from "./components/List";

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Input />
      </header>
      <main className="main">
        <div className="toggle-all-container">
          <input className="toggle-all" type="checkbox" />
          <label className="toggle-all-label" htmlFor="toggle-all">Mark all as complete</label>
        </div>
        <List />
      </main>
      <Footer />
    </section>
  )
}

export default App;