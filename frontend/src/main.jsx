import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const Context = createContext({
  isUserAuthenticated: false,
  setIsUserAuthenticated: () => {},
  user: null,
  setUser: () => {},
  cartItems:[],
  setCartItems: () => {},
});


  const AppWrapper = () => {
    
    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false);
    const [user,setUser] = useState({});
    const [cartItems,setCartItems] = useState([]);

    return (
      <Context.Provider value={{isUserAuthenticated,setIsUserAuthenticated,user,setUser,cartItems,setCartItems}}>
        <App />
      </Context.Provider>
    )

  }



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
