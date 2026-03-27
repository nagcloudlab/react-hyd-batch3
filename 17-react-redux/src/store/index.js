

import { configureStore, createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})


const accountsSlice = createSlice({
    name: 'accounts',
    initialState: [
        {
            number: '123456789',
            balance: 1000
        },
        {
            number: '987654321',
            balance: 500
        }
    ],
    reducers: {
        withdraw: (state, action) => {
            const { accountNumber, amount } = action.payload
            const account = state.find(acc => acc.number === accountNumber)
            if (account && account.balance >= amount) {
                account.balance -= amount
            }
        },
        deposit: (state, action) => {
            const { accountNumber, amount } = action.payload
            const account = state.find(acc => acc.number === accountNumber)
            if (account) {
                account.balance += amount
            }
        }
    }
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { withdraw, deposit } = accountsSlice.actions

export default configureStore({
    reducer: {
        counter: counterSlice.reducer,
        accounts: accountsSlice.reducer
    }
})