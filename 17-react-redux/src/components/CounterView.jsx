
import {
    useSelector
} from 'react-redux'

function CounterView() {
    const counter = useSelector(state => state.counter.value)
    return (
        <div className='counter-view'>
            <p className='section-kicker'>Counter View</p>
            <div className='counter-pill'>Counter Value: {counter}</div>
            <p className='helper-text'>Live value from Redux store state.</p>
        </div>
    )
}

export default CounterView;