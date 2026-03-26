import TodoItem from "./TodoItem";



function TodoList() {
    return (
        <ul className="todo-list">
            <TodoItem />
            <TodoItem />
        </ul>
    )
}

export default TodoList;