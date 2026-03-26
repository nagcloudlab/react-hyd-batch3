import { useContext } from 'react';
import TodosContext from '../contexts/TodosContext.jsx';

function Footer({ onTabChange }) {
    const { todos, tab, dispatch } = useContext(TodosContext);
    const todosLeftCount = todos.filter(todo => !todo.completed).length;
    const handleClearCompleted = () => {
        dispatch({
            type: "CLEAR_COMPLETED"
        });
    }
    const handleTabChange = (tab) => {
        if (onTabChange) {
            onTabChange(tab);
        }
    }
    return (
        <footer className="footer">
            <span className="todo-count">{todosLeftCount} items left</span>
            <ul className="filters">
                <li>
                    <a onClick={e => handleTabChange('all')}
                        href="#/" className={tab === 'all' ? 'selected' : ''}>All</a>
                </li>
                <li>
                    <a onClick={e => handleTabChange('active')}
                        href="#/active" className={tab === 'active' ? 'selected' : ''}>Active</a>
                </li>
                <li>
                    <a onClick={e => handleTabChange('completed')}
                        href="#/completed" className={tab === 'completed' ? 'selected' : ''}>Completed</a>
                </li>
            </ul>
            <button onClick={handleClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    )
}
export default Footer;