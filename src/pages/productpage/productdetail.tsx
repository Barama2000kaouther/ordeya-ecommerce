import { useState } from 'react';
import type Product from '../../types';
import shopping from '../../assets/icons/cart.svg';
import heart from '../../assets/icons/heart.svg';

function Productdetail({ product }: { product: Product | undefined }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.color[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

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
              src={product.images[selectedImage]}
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
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg transition-all duration-300 md:h-24 md:w-20 ${
                  selectedImage === index
                    ? 'ring-2 ring-[#754675] ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
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
              {product.color.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
                    selectedColor === color
                      ? 'ring-1 ring-[#754675] ring-offset-2'
                      : 'hover:scale-110'
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
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
              {product.size.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 min-w-12 items-center justify-center rounded-lg border px-4 text-sm transition-all duration-300 ${
                    selectedSize === size
                      ? 'border-[#754675] bg-[#754675] text-white'
                      : 'border-[#DDD5DE] text-[#4A3B4B] hover:border-[#754675] hover:text-[#754675]'
                  }`}
                >
                  {size}
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
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#DDD5DE] bg-white transition-all duration-300 hover:border-[#754675] hover:bg-[#F9F5F9]"
            >
              <img
                src={heart}
                alt=""
                className="h-5 w-5"
              />
            </button>
          </div>

          {/* Buy now */}
          <button
            type="button"
            className="mt-3 h-13 w-full rounded-xl border border-[#3E263F] bg-[#3E263F] text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#754675] hover:border-[#754675]"
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

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#8E818F]">
                Returns
              </span>

              <span className="text-sm font-medium text-[#3E263F]">
                14 days
              </span>
            </div>

            

          </div>
        </div>
      </div>
    </section>
  );
}

export default Productdetail;