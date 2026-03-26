import {
    useContext,
    useState
} from 'react';
import TodosContext from '../contexts/TodosContext';


function Input({ onEnter, onBlur, title, }) {

    const { dispatch } = useContext(TodosContext);
    const [inputValue, setInputValue] = useState(title || '');

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    }
    const handleKeyUp = (event) => {
        if (event.key === "Escape") {
            if (onBlur) {
                onBlur();
            }
            return;
        }
        if (event.key === "Enter") {
            if (inputValue.trim() === "") {
                return;
            }
            if (onEnter) {
                onEnter(inputValue);
            } else {
                dispatch({
                    type: "ADD_TODO",
                    title: inputValue
                });
            }
        }
    }
    return (
        <>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                value={inputValue}
                onChange={(e) => handleChange(e)}
                onKeyUp={handleKeyUp}
                onBlur={onBlur}
            />
        </>
    )
}

export default Input;