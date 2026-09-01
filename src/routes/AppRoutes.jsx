import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductAdmin from '../pages/ProductAdmin'
import ProductDetail from '../pages/ProductDetail'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/productos" element={<ProductAdmin />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
