import { useContext, useEffect} from 'react'
import './App.css'
import  Navbar from './Components/Navbar.jsx'
import  Main from './Components/Main.jsx'
import  {BrowserRouter,Route,Routes, useLocation} from 'react-router-dom' 
import Home from './Pages/Home.jsx'
import Men from './Pages/Men.jsx'
import Women from './Pages/Women.jsx'
import Children from './Pages/Children.jsx'
import Shoes from './Pages/Shoes.jsx'
import Electronic from './Pages/Electronic.jsx'
import HomeAppliances from './Pages/HomeAppliances.jsx'
import Discounts from './Pages/Discounts.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import AllProduct from './Pages/AllProduct.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import Communication from './Pages/Communication.jsx'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import ShoppingCart from './Pages/ShoppingCart.jsx'
import Footer from './Components/Footer.jsx'
import { Context } from './main'
import Cookies from 'js-cookie'
import Order from './Pages/Order.jsx'



function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname]);
  return null;
  }

function AppContent() {
  const {setIsUserAuthenticated,setUser } = useContext(Context);
  
  useEffect(() => {
    const token = Cookies.get('UserToken');
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
    if(isAuthenticated && storedUser){
      setIsUserAuthenticated(true);
      setUser(JSON.parse(storedUser))
    }
    else {
      setIsUserAuthenticated(!!token);
    }
  }, [setIsUserAuthenticated,setUser]);

  const location = useLocation();
  const isHomePage = location.pathname === '/';



    return (
      <>        
          <ScrollToTop/>
         <Navbar/> 
          <div className="main-content">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Men' element={<Men />}/>
            <Route path='/Women' element={<Women />}/>
            <Route path='/Children' element={<Children />}/>
            <Route path='/Shoes' element={<Shoes />}/>
            <Route path='/Electronic' element={<Electronic />}/>
            <Route path='/HomeAppliances' element={<HomeAppliances />}/>
            <Route path='/Discounts' element={<Discounts />}/>
            <Route path='/AboutUs' element={<AboutUs />}/>
            <Route path='/AllProduct' element={<AllProduct/>}/>
            <Route path='/Communication' element={<Communication />}/>
            <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/ShoppingCart' element={<ShoppingCart/>}/>
            <Route path='/Order' element={<Order/>}/>
          </Routes>
          </div>
          {isHomePage  &&  <Footer />}
          <ToastContainer position="top-right" autoClose={3000} />    
    </>
  )
}
 
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
