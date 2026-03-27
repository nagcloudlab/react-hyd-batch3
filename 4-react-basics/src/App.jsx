
import {
  useState
} from 'react'

import Message from './components/Message.jsx'

function App() {
  console.log("App :: rendered")

  const [message, setMessage] = useState("welcome to react")
  const [cart, setCart] = useState([
    "mobile",
    "laptop",
    "tv"
  ])
  const [user, setUser] = useState({
    name: "Nag",
    email: "nag@example.com"
  })

  const handleGreeting = (message) => {
    setMessage(message)
  }

  const handleAddToCart = () => {
    setCart([
      ...cart,
      "headphone"
    ])
  }

  const handleNameChange = () => {
    setUser({
      ...user,
      name: "Nag N"
    })
  }
  const handleEmailChange = () => {
    setUser({
      ...user,
      email: "nag@npci.com"
    })
  }

  return (
    <>
      <div className="container">
        <div className='card'>
          <div className='card-body'>
            <div className="display-1">react basics</div>
            <hr />
            <div className='d-flex justify-content-between'>
              <button onClick={handleNameChange} className='btn btn-primary'>Change Name</button>
              <button onClick={handleEmailChange} className='btn btn-secondary'>Change Email</button>
            </div>
            <hr />
            <div className='h3'>User: {user.name} - {user.email}</div>
            <hr />
            <button onClick={handleAddToCart} className='btn btn-dark'>Add to cart</button>
            <hr />
            <ul className='list-group'>
              {cart.map((item) => (
                <li className='list-group-item' key={item}>{item}</li>
              ))}
            </ul>
            <hr />
            <div className='d-flex justify-content-around'>
              <button onClick={() => handleGreeting("good morning")} className='btn btn-primary'>GM</button>
              <button onClick={() => handleGreeting("good noon")} className='btn btn-primary'>GN</button>
              <button onClick={() => handleGreeting("good evening")} className='btn btn-primary'>GE</button>
            </div>
            <hr />
            <Message message={message} from="Nag" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App