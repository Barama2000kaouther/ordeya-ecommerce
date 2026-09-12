import { useState } from 'react';
import type { Product } from '../../types';
import shopping from '../../assets/icons/cart.svg';
import heart from '../../assets/icons/heart.svg';
import { handleclick } from '../../utils';
import type { Carts } from '../../types';
import { isProductInWishlist } from '../../utils';
import { supabase } from '../../supabase';
import { useNavigate } from "react-router";
interface ProductPageProps {
  product: Product;
  userId?: string;
  refreshWishlist: () => void;
  wishlist: Product[];
}
function Productdetail({ product, userId, refreshWishlist, wishlist }: ProductPageProps) {
  let navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedSizeid, setSelectedSizeid] = useState<number | null>(null);
  const [message, setmessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [Cart, setCart] = useState<Carts | null>(null);

  const Addcart = async (element:string) => {
    // Check if user is authenticated
    if (!userId) {
      setmessage("Vous devez être connecté.");
      return;
    }

    // Check color and size first
    if (!selectedColor || selectedSize === null) {
      setmessage("N'oubliez pas de choisir une couleur et une taille.");
      return;
    }

    const timestamp = new Date().toISOString();

    // 1. Check if the user already has a cart
    const { data: existingCart, error: fetchCartError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchCartError) {
      console.log("Error fetching cart:", fetchCartError);
      setmessage("Une erreur est survenue.");
      return;
    }

    let currentCart: Carts | null = existingCart;

    // 2. If cart exists → update it
    if (existingCart) {
      const { data: updatedCart, error: updateCartError } = await supabase
        .from("cart")
        .update({ updated_at: timestamp })
        .eq("id", existingCart.id)
        .select()
        .single();

      if (updateCartError) {
        console.log("Error updating cart:", updateCartError);
        setmessage("Une erreur est survenue.");
        return;
      }

      currentCart = updatedCart;
    }

    // 3. If cart doesn't exist → create it
    else {
      const { data: newCart, error: insertCartError } = await supabase
        .from("cart")
        .insert({
          user_id: userId,
          updated_at: timestamp,
        })
        .select()
        .single();

      if (insertCartError) {
        console.log("Insert error:", insertCartError);
        setmessage("Une erreur est survenue.");
        return;
      }

      currentCart = newCart;
    }

    // 4. Make sure we have a cart
    if (!currentCart) {
      setmessage("Impossible de créer le panier.");
      return;
    }

    setCart(currentCart);

    // 5. Check if this exact product variant already exists
    const { data: existingItem, error: fetchItemError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", currentCart.id)
      .eq("product_id", product.id)
      .eq("size", selectedSize)
      .eq("color", selectedColor)
      .maybeSingle();

    if (fetchItemError) {
      console.log("Error checking cart item:", fetchItemError);
      setmessage("Une erreur est survenue.");
      return;
    }

    // 6. Existing item → increase quantity
    if (existingItem) {
      const { error: updateItemError } = await supabase
        .from("cart_items")
        .update({
          quantity: existingItem.quantity + quantity,
        })
        .eq("id", existingItem.id);

      if (updateItemError) {
        console.log("Error updating cart item:", updateItemError);
        setmessage("Une erreur est survenue.");
        return;
      }

      console.log("Quantity increased");
    }

    // 7. Item doesn't exist → create it
    else {
      console.log(currentCart);
      const { error: insertItemError } = await supabase
        .from("cart_items")
        .insert({
          cart_id: currentCart.id,
          product_id: product.id,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
        });

      if (insertItemError) {
        console.log("Error inserting cart item:", insertItemError);
        setmessage("Une erreur est survenue.");
        return;
      }

      console.log("New cart item created");
    }

    setmessage("Produit ajouté au panier.");
    if(element==='cart'){
      navigate("/cart");
    }
   else if (element==='checkout'){
      navigate("/checkout");

   }
  };

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-xl font-medium text-secondary">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-16 lg:px-12 lg:py-20">

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14 lg:gap-20">

        {/* ================= IMAGES ================= */}
        <div className="flex flex-col gap-4">

          {/* Main Image */}
          <div className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-[#F7F4F6]">
            <img
              src={product.images[selectedImage].url}
              alt={product.name}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-secondary shadow-sm backdrop-blur">
              {selectedImage + 1} / {product.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto px-1 py-1 justify-between pb-1">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg transition-all duration-300 md:h-24 md:w-20 ${selectedImage === index
                  ? 'ring-2 ring-[#754675] ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
                  }`}
              >
                <img
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex flex-col justify-center">

          {/* Brand */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9A8D9C]">
            {product.brand}
          </p>

          {/* Product name */}
          <h1 className="max-w-xl text-3xl font-medium leading-[1.15] tracking-tight text-[#3E263F] md:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 flex items-center gap-4">
            <p className="text-xl font-semibold text-text-3 md:text-2xl">
              {product.price} Dz
            </p>

            <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-secondary">
              In stock
            </span>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-[#E9E2EA]" />

          {/* Color */}
          <div className="mb-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-secondary">
                Color
              </p>

              <span className="text-xs text-[#9A8D9C]">
                {selectedColor}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.color)}
                  aria-label={`Select color ${color.id}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${selectedColor === color.color
                    ? 'ring-1 ring-[#754675] ring-offset-2'
                    : 'hover:scale-110'
                    }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-black/10"
                    style={{ backgroundColor: color.color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-secondary">
                Size
              </p>

            </div>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size.size)
                    setSelectedSizeid(size.id)
                  }}
                  className={`flex h-11 min-w-12 items-center justify-center rounded-lg border px-4 text-sm transition-all duration-300 ${selectedSizeid === size.id
                    ? 'border-[#754675] bg-[#754675] text-white'
                    : 'border-[#DDD5DE] text-[#4A3B4B] hover:border-[#754675] hover:text-[#754675]'
                    }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="mb-4 text-sm font-semibold text-secondary">
              Quantity
            </p>

            <div className="flex h-11 w-32 items-center justify-between rounded-lg border border-[#DDD5DE] px-3">
              <button
                type="button"
                onClick={() =>
                  setQuantity((quantity) => Math.max(1, quantity - 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-full text-lg text-[#754675] transition hover:bg-[#F4EDF5]"
              >
                −
              </button>

              <span className="text-sm font-medium text-[#3E263F]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((quantity) => quantity + 1)
                }
                className="flex h-7 w-7 items-center justify-center rounded-full text-lg text-secondary transition hover:bg-[#F4EDF5]"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">

            {/* Add to cart */}
            <button
              type="button"
              className="flex h-13 flex-1 items-center justify-center gap-3 rounded-xl bg-[#754675] text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:bg-[#5F365F] hover:shadow-lg"
              onClick={async (e) => {
                e.preventDefault();
                await Addcart("cart");
              }}
            >
              <img
                src={shopping}
                alt=""
                className="h-5 w-5 brightness-0 invert"
              />

              <span>Add to cart</span>
            </button>

            {/* Wishlist */}

            <button
              type="button"
              aria-label="Add to wishlist"
              className={` group/wishlist flex h-13 w-13 shrink-0 items-center
                 justify-center rounded-xl border border-[#DDD5DE]
                   transition-all duration-300 
                  ${isProductInWishlist(product.id, wishlist) ? "bg-secondary" : "bg-white"} 
                  ${isProductInWishlist(product.id, wishlist) ? "hover:border-secondary hover:bg-white" : "hover:border-white hover:bg-secondary"} 
                `}
              onClick={async (e) => {
                e.preventDefault();
                await handleclick(product?.id, userId, setmessage, refreshWishlist);
              }}
            >
              <img
                src={heart}
                alt=""
                className={`h-5 w-5 ${isProductInWishlist(product.id, wishlist) ? "brightness-0 invert" : ""} 
                ${isProductInWishlist(product.id, wishlist) ? "group-hover/wishlist:invert-0" : "group-hover/wishlist:brightness-0 group-hover/wishlist:invert"} `}
              />
            </button>
          </div>
          <p>{message}</p>
          {/* Buy now */}
          <button
            type="button"
            className="mt-3 h-13 w-full rounded-xl border border-[#3E263F] bg-[#3E263F] text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#754675] hover:border-[#754675]"
            onClick={async (e) => {
              e.preventDefault();
              await Addcart("checkout");
              
            }}
          >
            Buy now
          </button>

          {/* Product information */}
          <div className="mt-8 space-y-4 border-t border-[#E9E2EA] pt-6">

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E818F]">
                Delivery
              </span>

              <span className="text-sm font-medium text-[#3E263F]">
                Available
              </span>
            </div>

          </div>
        </div>
      </div>
    </section >
  );
}

export default Productdetail;