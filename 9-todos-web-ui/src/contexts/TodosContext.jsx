
import { createContext } from 'react';

const TodosContext = createContext({
    todos: [],
    dispatch: () => { }
});

export default TodosContext;