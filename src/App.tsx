import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AppLayoutAdmin from "./components/AppLayoutAdmin";
import AddAttributepage from "./pages/Admin/AddAttributePage";
import AddCategoryPage from "./pages/Admin/AddCategoryPage";
import AddProductPage from "./pages/Admin/AddProductPage";
import AttributePage from "./pages/Admin/AttributePage";
import CategoryPage from "./pages/Admin/CategoryPage";
import Dashboard from "./pages/Admin/Dashboard";
import EditAttributePage from "./pages/Admin/EditAttributePage";
import EditCategoryPage from "./pages/Admin/EditCategoryPage";
import EditProductPage from "./pages/Admin/EditProductPage";
import OrderPage from "./pages/Admin/OrderPage";
import ProductsPage from "./pages/Admin/ProductsPage";
import SettingPage from "./pages/Admin/SettingPage";
import UserPage from "./pages/Admin/UserPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopPage from "./pages/ShopPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AttributeProvider } from "./context/AttributeProvider";

function App() {
  return (
    <AttributeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="detail/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<CheckoutPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
          </Route>

          <Route path="dashboard" element={<AppLayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="categories/add" element={<AddCategoryPage />} />
            <Route path="categories/edit/:id" element={<EditCategoryPage />} />
            <Route path="attributes" element={<AttributePage />} />
            <Route path="attributes/add" element={<AddAttributepage />} />
            <Route path="attributes/edit/:id" element={<EditAttributePage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="settings" element={<SettingPage />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found !</h1>} />
        </Routes>
      </BrowserRouter>
    </AttributeProvider>
  );
}

export default App;
