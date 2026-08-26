import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/homePage/home';
import type Product from './types';
import product1 from './assets/images/product1.png';
import product2 from './assets/images/product2.png';
import product3 from './assets/images/product3.png';
import product4 from './assets/images/product4.png';
import WishList from './pages/wishlist/wishlist';
import Shop from './pages/shop/shop';
import ProductPage from './pages/productpage/productPage.tsx';
import Cart from './pages/cart/cart.tsx';
import Checkout from './pages/checkout/checkoutpage.tsx';
function App() {
  const Products: Product[] = [
    {
      id: 1,
      brand: "ordeya-brand",
      name: "hijab Elena",
      price: 4500,
      images: [
        product1,
        product1,
        product1,
        product1,
        product1,
      ],
      color: [
        '#B38FCC',
        '#EFEC77',
        '#A1C1FC',
        '#4C4245',
        '#A8A3A0',
        '#6A605E',
      ],
      size: [36, 38, 40, 42, 44],
    },

    {
      id: 2,
      brand: "ordeya-brand",
      name: "hijab Elena",
      price: 4500,
      images: [
        product2,
        product2,
        product2,
        product2,
        product2,
      ],
      color: [
        '#B38FCC',
        '#EFEC77',
        '#A1C1FC',
        '#4C4245',
        '#A8A3A0',
        '#6A605E',
      ],
      size: [36, 38, 40, 42, 44],
    },

    {
      id: 3,
      brand: "ordeya-brand",
      name: "hijab Elena",
      price: 4500,
      images: [
        product3,
        product3,
        product3,
        product3,
        product3,
      ],
      color: [
        '#B38FCC',
        '#EFEC77',
        '#A1C1FC',
        '#4C4245',
        '#A8A3A0',
        '#6A605E',
      ],
      size: [36, 38, 40, 42, 44],
    },

    {
      id: 4,
      brand: "ordeya-brand",
      name: "hijab Elena",
      price: 4500,
      images: [
        product4,
        product4,
        product4,
        product4,
        product4,
      ],
      color: [
        '#B38FCC',
        '#EFEC77',
        '#A1C1FC',
        '#4C4245',
        '#A8A3A0',
        '#6A605E',
      ],
      size: [36, 38, 40, 42, 44],
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage products={Products} />} />
          <Route path="wishlist/" element={<WishList products={Products} />} />
          <Route path="shop/" element={<Shop products={Products} />} />
          <Route path="/product/:id"  element={<ProductPage products={Products} />}/>
          <Route path="/cart"  element={<Cart products={Products}/>}/>
          <Route path="/checkout"  element={<Checkout products={Products}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
