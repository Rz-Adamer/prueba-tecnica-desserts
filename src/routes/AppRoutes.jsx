import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
