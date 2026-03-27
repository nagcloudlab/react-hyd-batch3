

import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    increment, decrement, incrementByAmount
} from '../store/index.js'


function CounterBox() {

    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter.value)

    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }

    return (
        <div className="counter-box">
            <h2>Counter Box</h2>
            <p className="counter-value">Counter Value: {counter}</p>
            <div className="counter-actions">
                <button className="btn-primary" onClick={handleInc}>Increment</button>
                <button className="btn-secondary" onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button>
                <button className="btn-neutral" onClick={handleDec}>Decrement</button>
            </div>
        </div>
    )
}

export default CounterBox