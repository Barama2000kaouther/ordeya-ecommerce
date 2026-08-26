import { Link } from "react-router";

import logo from "../assets/icons/logo.svg";
import cartIcon from "../assets/icons/cart.svg";
import wishlistIcon from "../assets/icons/heart.svg";
import languageIcon from "../assets/icons/internet.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center"
        >
          <img
            src={logo}
            alt="Logo"
            className="
              h-8 w-auto
              transition-transform duration-300
              group-hover:scale-105
              sm:h-10
            "
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="
              group relative flex h-10 w-10
              items-center justify-center
              rounded-full
              transition-all duration-300
              hover:bg-[#F6EEF5]
            "
          >
            <img
              src={wishlistIcon}
              alt="Wishlist"
              className="
                h-5 w-5
                transition-all duration-300
                group-hover:scale-110
              "
            />

            {/* Badge */}
            <span
              className="
                absolute -right-0.5 -top-0.5
                flex h-4 min-w-4 items-center justify-center
                rounded-full
                bg-secondary
                px-1
                text-[9px] font-bold text-white
                shadow-sm
                sm:h-5 sm:min-w-5 sm:text-[10px]
              "
            >
              2
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="
              group relative flex h-10 w-10
              items-center justify-center
              rounded-full
              transition-all duration-300
              hover:bg-[#F6EEF5]
            "
          >
            <img
              src={cartIcon}
              alt="Cart"
              className="
                h-5 w-5
                transition-all duration-300
                group-hover:scale-110
              "
            />

            {/* Badge */}
            <span
              className="
                absolute -right-0.5 -top-0.5
                flex h-4 min-w-4 items-center justify-center
                rounded-full
                bg-[#56044F]
                px-1
                text-[9px] font-bold text-white
                shadow-sm
                sm:h-5 sm:min-w-5 sm:text-[10px]
              "
            >
              3
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-gray-200 sm:block" />

          {/* Language */}
          <button
            type="button"
            className="
              group flex h-10 items-center gap-2
              rounded-full px-3
              text-sm font-semibold text-gray-700
              transition-all duration-300
              hover:bg-[#F6EEF5]
              hover:text-[#56044F]
            "
          >
            <img
              src={languageIcon}
              alt="Language"
              className="
                h-5 w-5
                transition-transform duration-300
                group-hover:rotate-12
              "
            />

            <span>EN</span>

            {/* Small arrow */}
            <span className="text-[10px] opacity-50">
              ▼
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;