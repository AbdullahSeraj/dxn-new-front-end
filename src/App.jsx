import './App.css'
import 'react-slideshow-image/dist/styles.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import LayoutRoot from './components/LayoutRoot'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

import Cookies from "js-cookie"
import DashboardProducts from './pages/DashboardProducts'
import DashboardUsers from './pages/DashboardUsers'
import SecurityUser from './components/security/SecurityUser'
import SecurityAdmin from './components/security/SecurityAdmin'
import NotFound from './components/security/NotFound'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Saved from './pages/Saved'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import DashboardCategories from './pages/DashboardCategories'
import Demo from './pages/Demo'
import DashboardSettings from './pages/DashboardSettings'
import Paypal from './pages/Paypal'

function App() {
  const token = Cookies.get("accessToken")

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<LayoutRoot />}>
      <Route index element={<Home />} />
      <Route path='signup' element={token ? <Navigate to={"/"} /> : <Signup />} />
      <Route path='signin' element={token ? <Navigate to={"/"} /> : <Signin />} />
      <Route path='profile' element={<SecurityUser><Profile /></SecurityUser>} />
      <Route path='dashboard' element={<SecurityAdmin><Dashboard /></SecurityAdmin>} >
        <Route path="products" element={<DashboardProducts />} />
        <Route path='users' element={<DashboardUsers />} />
        <Route path='categories' element={<DashboardCategories />} />
        <Route path='settings' element={<DashboardSettings />} />
      </Route>
      <Route path="products" element={<Products />} />
      <Route path="details/:id" element={<ProductDetails />} />
      <Route path="cart" element={<SecurityUser><Cart /></SecurityUser>} />
      <Route path="saved" element={<SecurityUser><Saved /></SecurityUser>} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="demo" element={<SecurityUser><Demo /></SecurityUser>} />
      <Route path="demo/paypal" element={<SecurityUser><Paypal /></SecurityUser>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ))


  return <RouterProvider router={router} />
}

export default App
