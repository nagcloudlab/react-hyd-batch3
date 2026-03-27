import { createContext, useContext, useReducer } from "react"
import PatternLayout from "./PatternLayout"

const products = [
  { id: 1, name: "Wireless Mouse", price: 29.99 },
  { id: 2, name: "Mechanical Keyboard", price: 89.99 },
  { id: 3, name: "USB-C Hub", price: 49.99 },
]

// Shared reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case "REMOVE_ITEM": return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case "CLEAR_CART": return { ...state, items: [] }
    default: return state
  }
}

// Problem: Raw dispatch with strings
const CartCtx1 = createContext()

function CartProvider1({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  return <CartCtx1.Provider value={{ state, dispatch }}>{children}</CartCtx1.Provider>
}

function ProblemShop() {
  const { state, dispatch } = useContext(CartCtx1)
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <div>
      <div className="d-flex gap-1 flex-wrap mb-2">
        {products.map(p => (
          <button key={p.id} className="btn btn-sm btn-outline-primary"
            onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}>
            {p.name} ${p.price}
          </button>
        ))}
      </div>
      {state.items.length > 0 && (
        <div className="card">
          <div className="card-body py-2">
            {state.items.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center small mb-1">
                <span>{item.name} x{item.qty}</span>
                <div className="d-flex align-items-center gap-2">
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                  <button className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>Remove</button>
                </div>
              </div>
            ))}
            <hr className="my-1" />
            <div className="d-flex justify-content-between small fw-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear Cart</button>
          </div>
        </div>
      )}
      <p className="text-danger small mt-2 mb-0">dispatch(&#123; type: "ADD_ITME" &#125;) -- typo = silent bug. No autocomplete.</p>
    </div>
  )
}

// Solution: Context Module Functions
const CartCtx2 = createContext()

function CartProvider2({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  return <CartCtx2.Provider value={{ state, dispatch }}>{children}</CartCtx2.Provider>
}

const addItem = (dispatch, item) => dispatch({ type: "ADD_ITEM", payload: item })
const removeItem = (dispatch, id) => dispatch({ type: "REMOVE_ITEM", payload: id })
const clearCart = (dispatch) => dispatch({ type: "CLEAR_CART" })

function SolutionShop() {
  const { state, dispatch } = useContext(CartCtx2)
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <div>
      <div className="d-flex gap-1 flex-wrap mb-2">
        {products.map(p => (
          <button key={p.id} className="btn btn-sm btn-outline-success"
            onClick={() => addItem(dispatch, p)}>
            {p.name} ${p.price}
          </button>
        ))}
      </div>
      {state.items.length > 0 && (
        <div className="card">
          <div className="card-body py-2">
            {state.items.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center small mb-1">
                <span>{item.name} x{item.qty}</span>
                <div className="d-flex align-items-center gap-2">
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                  <button className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => removeItem(dispatch, item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <hr className="my-1" />
            <div className="d-flex justify-content-between small fw-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn btn-sm btn-outline-danger mt-1" onClick={() => clearCart(dispatch)}>Clear Cart</button>
          </div>
        </div>
      )}
      <p className="text-success small mt-2 mb-0">addItem(dispatch, product) -- no strings, discoverable, type-safe with TS.</p>
    </div>
  )
}

function ContextModulePattern() {
  return (
    <PatternLayout
      title="Context Module"
      description="Encapsulate dispatch calls in functions so consumers never touch raw action strings."
      whyPoints={[
        "No magic strings -- typos in action types become impossible",
        "Action logic centralized -- change payload shape once, updates everywhere",
        "Clean consumer API: addItem(dispatch, product) vs dispatch({ type: 'ADD_ITEM', payload: ... })",
        "Pairs well with TypeScript -- functions provide type safety and autocomplete for free",
      ]}
      problem={
        <div>
          <div className="label-problem">Raw dispatch with magic strings throughout the app:</div>
          <div className="code-demo-row">
            <div className="code-block">{`// Scattered across components:
dispatch({
  type: "ADD_ITEM", payload: product
})
dispatch({
  type: "REMOVE_ITEM", payload: id
})
dispatch({ type: "CLEAR_CART" })

// Typo in "REMOVE_ITME"? Silent failure.
// Changed payload shape? Hunt every file.
// No autocomplete. No type checking.
// New dev? How do they discover actions?`}</div>
            <div className="demo-area"><CartProvider1><ProblemShop /></CartProvider1></div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Module functions encapsulate all action details:</div>
          <div className="code-demo-row">
            <div className="code-block">{`// cart-context.js -- single source of truth:
export const addItem = (dispatch, item) =>
  dispatch({ type: "ADD_ITEM", payload: item })

export const removeItem = (dispatch, id) =>
  dispatch({
    type: "REMOVE_ITEM", payload: id
  })

export const clearCart = (dispatch) =>
  dispatch({ type: "CLEAR_CART" })

// Consumer code -- clean and safe:
addItem(dispatch, product)    // autocomplete!
removeItem(dispatch, item.id) // type-checked!
clearCart(dispatch)            // discoverable!`}</div>
            <div className="demo-area"><CartProvider2><SolutionShop /></CartProvider2></div>
          </div>
        </div>
      }
    />
  )
}

export default ContextModulePattern
