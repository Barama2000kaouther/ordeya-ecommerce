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
import ScrollToTop from './ScrollToTop.tsx';
import { useTranslation } from 'react-i18next';
// i have a wishlist in the product detail and i forget to change their function and i have to change it  
function App() {

  const [willayas, setWillayas] = useState<WilayaTarif[]>([]);
  const [Products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [CartItems, setCartItems] = useState<CartItems[]>([]);
  const [userId, setuserId] = useState<string | undefined>(undefined);
  const initializing = useRef(false);
  const { i18n } = useTranslation();
  useEffect(() => {
    const language = i18n.language;
    const isArabic = language.startsWith("ar");

    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = language;
    console.log("Current language:", i18n.language);
  }, [i18n.language]);



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
  }, []);

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
  }, []);



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
          <ScrollToTop />
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
