

import {
    useSelector,
    useDispatch
} from 'react-redux'

import { withdraw, deposit } from '../store/index.js'

function AccountsView() {
    const accounts = useSelector(state => state.accounts)
    const dispatch = useDispatch()
    return (
        <div className='accounts-view'>
            <div className='accounts-head'>
                <h2>Accounts</h2>
                <p className='helper-text'>Use each card to deposit or withdraw funds.</p>
            </div>

            <div className='account-list'>
                {accounts.map(acc => (
                    <div key={acc.number} className='account-card'>
                        <h3>Account {acc.number}</h3>
                        <p className='account-meta'>Balance: ${acc.balance}</p>
                        <div className='account-actions'>
                            <button className='btn-danger' onClick={() => dispatch(withdraw({ accountNumber: acc.number, amount: 100 }))}>Withdraw $100</button>
                            <button className='btn-primary' onClick={() => dispatch(deposit({ accountNumber: acc.number, amount: 100 }))}>Deposit $100</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AccountsView