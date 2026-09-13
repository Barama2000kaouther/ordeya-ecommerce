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
  const [wilayas, setWilayas] = useState<WilayaTarif[]>([]);
  const [Products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [userId, setuserId] = useState<string | undefined>('');
  const [wishlistVersion, setWishlistVersion] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const initializing = useRef(false);
  useEffect(() => {
    const fetchWilays = async () => {
      const { data: wilaya_tarifs, error } = await supabase
        .from('wilaya_tarifs')
        .select('*');
      if (error) {
        console.log('Error fetching wilayas:', error);
        return;
      }

      setWilayas(wilaya_tarifs);
    };

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
    const initSession = async () => {
      // Prevent StrictMode from running initialization twice
      if (initializing.current) return;

      initializing.current = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          console.log("Existing user:", session.user.id);
          setuserId(session.user.id);
          return;
        }

        const { data, error } =
          await supabase.auth.signInAnonymously();

        if (error) {
          console.error("Anonymous login error:", error);
          return;
        }

        console.log("Created user:", data.user?.id);
        setuserId(data.user?.id);
        // If you insert the user into your own table,
        // do it HERE, after getting the user ID.

      } finally {
        initializing.current = false;
      }
    };


    fetchWilays();
    fetchproducts();
    console.log("the session element");
    initSession();

  }, []);

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
      const wishlistProducts: Product[] =
        data?.flatMap((item) => item.products) ?? [];

      setWishlist(wishlistProducts);
      const count = data?.length ?? 0;
      setWishlistCount(count);
      console.log("wishlist element ", wishlistProducts);
    }
    fetchwislist();
  }, [wishlistVersion]);


  const refreshWishlist = () => {
    setWishlistVersion(prev => prev + 1);
  };
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage products={Products} userId={userId} refreshWishlist={refreshWishlist} wishlistCount={wishlistCount} wishlist={wishlist} />} />
          <Route path="wishlist/" element={<WishList products={wishlist} userId={userId} refreshWishlist={refreshWishlist} wishlistCount={wishlistCount} />} />
          <Route path="shop/" element={<Shop products={Products} userId={userId} refreshWishlist={refreshWishlist} wishlistCount={wishlistCount} wishlist={wishlist} />} />
          <Route path="/product/:id" element={<ProductPage products={Products} wishlistCount={wishlistCount} userId={userId} refreshWishlist={refreshWishlist} wishlist={wishlist} />} />
          <Route path="/cart" element={<Cart willays={wilayas} wishlistCount={wishlistCount} />} />
          <Route path="/checkout" element={<Checkout willays={wilayas} wishlistCount={wishlistCount} userId={userId} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
