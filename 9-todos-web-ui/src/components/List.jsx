import { useContext } from "react";
import TodosContext from "../contexts/TodosContext";
import Item from "./Item";

const TODOS_FILTERS = {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
}

function List({ /*todos*/ }) {
    const { todos, tab } = useContext(TodosContext);
    const filteredTodos = todos.filter(TODOS_FILTERS[tab]);

    return (
        <ul className="todo-list">
            {filteredTodos.map(todo => <Item key={todo.id} todo={todo} />)}
        </ul>
    )
}

export default List;