
import { createContext } from 'react';

const TodosContext = createContext({
    todos: [],
    currentTab: 'all',
    dispatch: () => { }
});

export default TodosContext;