import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { supabase } from './supabase.ts';
import { useEffect, useState, useRef } from 'react';
import HomePage from './pages/homePage/home';
import type { Product } from './types';
import type { WilayaTarif } from './types';
import WishList from './pages/wishlist/wishlist';
import Shop from './pages/shop/shop';
import ProductPage from './pages/productpage/productPage.tsx';
import Cart from './pages/cart/cart.tsx';
import Checkout from './pages/checkout/checkoutpage.tsx';
import type { CartItems } from './types';
import { AppProvider } from './context/appcontext.tsx';
import SucessOrder from './pages/order/order.tsx';
// i have a wishlist in the product detail and i forget to change their function and i have to change it  
function App() {
  // const Products: Product[] = [
  //   {
  //     id: 1,
  //     brand: "ordeya-brand",
  //     name: "Hijab Elena",
  //     price: 3800,
  //     images: [
  //       product1,
  //       product1,
  //       product1,
  //       product1,
  //       product1,
  //     ],
  //     color: [
  //       '#B38FCC',
  //       '#EFEC77',
  //       '#A1C1FC',
  //       '#4C4245',
  //       '#A8A3A0',
  //       '#6A605E',
  //     ],
  //     size: [36, 38, 40, 42, 44],
  //   },

  //   {
  //     id: 2,
  //     brand: "ordeya-brand",
  //     name: "Rob Tima",
  //     price: 4200,
  //     images: [
  //       product3,
  //       product3,
  //       product3,
  //       product3,
  //       product3,
  //     ],
  //     color: [
  //       '#969BC7',
  //       '#A2AD8C',
  //       '#000000',
  //     ],
  //     size: [36, 38, 40, 42, 44],
  //   },

  //   {
  //     id: 3,
  //     brand: "ordeya-brand",
  //     name: "ensemble pretty",
  //     price: 3900,
  //     images: [
  //       product2,
  //       product2,
  //       product2,
  //       product2,
  //       product2,
  //     ],
  //     color: [
  //       '#A2AD8C',
  //       '#726361',
  //       '#969BC7',
  //       '#AEA3A6',
  //       '#000000',
  //     ],
  //     size: [36, 38, 40, 42, 44],
  //   },

  //   {
  //     id: 4,
  //     brand: "ordeya-brand",
  //     name: "Abaya Anika",
  //     price: 3700,
  //     images: [
  //       product4,
  //       product4,
  //       product4,
  //       product4,
  //       product4,
  //     ],
  //     color: [
  //       '#A5C8D5',
  //       '#000000',
  //     ],
  //     size: [36, 38, 40, 42, 44],
  //   },
  // ];
  const [willayas, setWillayas] = useState<WilayaTarif[]>([]);
  const [Products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [CartItems, setCartItems] = useState<CartItems[]>([]);
  const [userId, setuserId] = useState<string | undefined>(undefined);
  const initializing = useRef(false);

  useEffect(() => {
    // Fetch all wilayas and their delivery prices
    const fetchWilays = async () => {
      const { data: wilaya_tarifs, error } = await supabase
        .from('wilaya_tarifs')
        .select('*');
      if (error) {
        console.log('Error fetching wilayas:', error);
        return;
      }

      setWillayas(wilaya_tarifs);
    };
    // Fetch all products with their related images, colors, and sizes
    const fetchproducts = async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
              *,
            images:"product-images" ( id, url),
            colors:"product-color"( id, color ),
            sizes:"product-size"( id, size )
            `);
      if (error) {
        console.log('Error fetching wilayas:', error);
        return;
      }

      setProducts(products);
    }
    // Initialize the user's Supabase session
    const initSession = async () => {
      // Prevent StrictMode from running initialization twice
      if (initializing.current) return;

      initializing.current = true;

      try {
        // Check if the user already has an active session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        // If a session already exists, use the existing user
        if (session) {
          console.log("Existing user:", session.user.id);
          setuserId(session.user.id);
          return;
        }
        // If there is no session, create an anonymous user
        const { data, error } =
          await supabase.auth.signInAnonymously();

        if (error) {
          console.error("Anonymous login error:", error);
          return;
        }

        setuserId(data.user?.id);
        // If you insert the user into your own table,
        // do it HERE, after getting the user ID.

      } finally {
        initializing.current = false;
      }
    };
    // Run all initial data-fetching functions
    fetchWilays();
    fetchproducts();
    initSession();
  }, []);

  // Fetch the current user's wishlist whenever wishlistVersion changes
  useEffect(() => {
    const fetchwislist = async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select(`
                        id,
                        product_id,
                       products (
                            *, images:"product-images" ( id, url),
                            colors:"product-color"( id, color ),
                            sizes:"product-size"( id, size )
                            )
                    `);

      if (error) {
        console.log(error);
      }
      console.log(data);
      // Extract products from the wishlist records
      const wishlistProducts: Product[] =
        data?.flatMap((item) => item.products) ?? [];

      setWishlist(wishlistProducts);
      console.log("wishlist element ", wishlistProducts);
    }
    fetchwislist();
  }, [ ]);

  // Fetch the user's cart items from Supabase
  useEffect(() => {
    const fetchCartItem = async () => {
      const { data: cart_items, error } = await supabase
        .from('cart_items')
        .select(`*
          ,   products ( *,
            images:"product-images" ( id, url),
            colors:"product-color"( id, color ),
            sizes:"product-size"( id, size ))`)
        .order('created_at', { ascending: true });
      if (error) {
        console.log('the read error', error);
      }
      const combinedItems = cart_items ?? [];
      setCartItems(combinedItems);
    };

    fetchCartItem();
  }, [ ]);



  return (
    <>
      <AppProvider value={{
        willayas,
        wishlist,
        CartItems,
        userId,
        setWishlist,
        setCartItems,
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage products={Products} />} />
            <Route path="wishlist/" element={<WishList products={wishlist} />} />
            <Route path="shop/" element={<Shop products={Products} />} />
            <Route path="/product/:id" element={<ProductPage products={Products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<SucessOrder />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  )
}

export default App
