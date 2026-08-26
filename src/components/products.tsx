import type Product from "../types";
import heart from "../assets/icons/heart.svg";
import cart from "../assets/icons/cart.svg";
import { Link } from "react-router";

interface ProductPageProps {
  products: Product[];
}

function Products({ products }: ProductPageProps) {
  return (
    <section className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="
            group relative overflow-hidden
            rounded-3xl
            border border-[#EDE7EC]
            bg-white
            shadow-[0_6px_25px_rgba(86,4,79,0.04)]
            transition-all duration-500
            hover:-translate-y-2
            hover:border-[#56044F]/10
            hover:shadow-[0_20px_45px_rgba(86,4,79,0.12)]
          "
        >
          {/* ================= PRODUCT LINK ================= */}
          <Link to={`/product/${product.id}`} className="block">

            {/* ================= IMAGE ================= */}
            <div
              className="
                relative aspect-4/5
                overflow-hidden
                bg-linear-to-br
                from-[#F2E9F1]
                via-[#FAF7F9]
                to-white
              "
            >
              {/* Decorative glow */}
              <div
                className="
                  pointer-events-none
                  absolute -bottom-16 left-1/2
                  h-40 w-40 -translate-x-1/2
                  rounded-full
                  bg-[#56044F]/10
                  blur-3xl
                  transition-all duration-700
                  group-hover:scale-150
                "
              />

              {/* Product image */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="
                  relative z-10
                  h-full w-full
                  object-cover
                  transition-transform duration-700
                  ease-out
                  group-hover:scale-[1.06]
                "
              />

              {/* Bottom image gradient */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 bottom-0 z-10
                  h-24
                  bg-linear-to-t
                  from-black/10
                  to-transparent
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />
            </div>

            {/* ================= INFORMATION ================= */}
            <div className="p-5 sm:p-6">

              {/* Brand */}
              <p
                className="
                  mb-1
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-text-secondary
                "
              >
                {product.brand}
              </p>

              {/* Name */}
              <h2
                className="
                  mb-4
                  truncate
                  text-base
                  font-semibold
                  text-secondary
                  transition-colors duration-300
                  group-hover:text-text
                  sm:text-lg
                "
              >
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#A397A3]">
                    Price
                  </span>

                  <p className="mt-0.5 text-lg font-bold text-text-3">
                    {product.price} DZ
                  </p>
                </div>
              </div>

            </div>
          </Link>

          {/* ================= WISHLIST ================= */}
           <Link
            to="/wishlist">
          <button
            type="button"
            aria-label="Add to wishlist"
            className="
              group/wishlist
              absolute right-4 top-4 z-20
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/70
              bg-white/90
              shadow-[0_5px_20px_rgba(0,0,0,0.08)]
              backdrop-blur-md
              transition-all duration-300
              hover:scale-110
              hover:bg-[#56044F]
              active:scale-95
            "
          >
            <img
              src={heart}
              alt=""
              className="
                h-5 w-5
                transition-all duration-300
                group-hover/wishlist:brightness-0
                group-hover/wishlist:invert
              "
            />
          </button>
           </Link>
          {/* ================= CART LINK ================= */}
          <Link
            to="/cart"
            aria-label="Add to cart"
            className="
              group/cart
              absolute bottom-5 right-5 z-20
              flex h-11 w-11
              items-center justify-center
              rounded-xl
              bg-[#56044F]
              shadow-md
              shadow-[#56044F]/15
              transition-all duration-300
              hover:w-14
              hover:bg-[#3F0339]
              hover:shadow-lg
              hover:shadow-[#56044F]/25
              active:scale-95
            "
          >
            <img
              src={cart}
              alt=""
              className="
                h-5 w-5
                brightness-0 invert
                transition-transform duration-300
                group-hover/cart:scale-110
              "
            />
          </Link>
        </article>
      ))}
    </section>
  );
}

export default Products;