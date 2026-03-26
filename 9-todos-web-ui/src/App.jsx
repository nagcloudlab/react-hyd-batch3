import TodoFooter from "./components/TodoFooter";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput />
      </header>
      <main className="main">
        <div className="toggle-all-container">
          <input className="toggle-all" type="checkbox" />
          <label className="toggle-all-label" htmlFor="toggle-all">Mark all as complete</label>
        </div>
        <TodoList />
      </main>
      <TodoFooter />
    </section>
  )
}

export default App;