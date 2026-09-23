import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo.svg";
import mail from "../assets/icons/contact/mail.svg";
import phone from "../assets/icons/contact/telephone.svg";
import website from "../assets/icons/contact/website.svg";

import facebook from "../assets/icons/social-media/facebook.svg";
import instegram from "../assets/icons/social-media/instagram.svg";
import tiktok from "../assets/icons/social-media/tik-tok.svg";
import whatsapp from "../assets/icons/social-media/whatsapp.svg";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-[#F2E9F1] via-[#F8F4F7] to-white">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#56044F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#B099B5]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12 lg:py-16">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">

          {/* ================= LOGO + CONTACT ================= */}
          <div className="flex flex-col items-center gap-6 sm:items-start">

            {/* Logo */}
            <Link
              to="/"
              className="group"
            >
              <img
                src={logo}
                alt="Orderya"
                className="
                  w-36
                  transition-transform duration-300
                  group-hover:scale-105
                  sm:w-40
                "
              />
            </Link>

            {/* Description */}
            <p
              dir="rtl"
              className="max-w-xs text-center text-sm leading-7 text-[#5E5660] sm:text-left"
            >
              {t("elegance")}
              <br />
              {t("discoverCollection")}
            </p>

            {/* Social media */}
            <div className="flex items-center gap-3">

              {[
                {
                  icon: instegram,
                  label: "Instagram",
                  link: 'https://www.instagram.com/ordeya_brand?stkn=MThrc2p4aDNsOThxbQ%3D%3D&utm_source=qr',
                },
                {
                  icon: facebook,
                  label: "Facebook",
                  link: 'https://www.facebook.com/people/Ordeya/61582483307602/?mibextid=wwXIfr&rdid=mFDOa2KNl8JVpGu8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18afm9Ako1%2F%3Fmibextid%3DwwXIfr',
                },
                {
                  icon: tiktok,
                  label: "TikTok",
                  link: 'https://www.tiktok.com/@ordeya?_r=1&_t=ZS-99q9Hi9tINY',
                },
                {
                  icon: whatsapp,
                  label: "Whatsapp",
                  link: "https://wa.me/213784970542",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  aria-label={social.label}
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-[#56044F]/10
                    bg-white/70
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#56044F]
                    hover:bg-[#56044F]
                    hover:shadow-lg
                  "
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="
                      h-5 w-5
                      transition-all duration-300
                      group-hover:scale-110
                    "
                  />
                </a>
              ))}

            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">

              <a
                href="https://wa.me/213784970542"
                className="
                  group flex items-center gap-3
                  text-sm text-[#5E5660]
                  transition-colors duration-300
                  hover:text-[#56044F]
                "
              >
                <span className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-white shadow-sm
                  transition-all duration-300
                  group-hover:bg-[#56044F]
                ">
                  <img
                    src={phone}
                    alt="Phone"
                    className="h-4 w-4"
                  />
                </span>

                <span>+213 784 970 542</span>
              </a>

              <a
                href="mailto:ordeya.algeria@gmail.com"
                className="
                  group flex items-center gap-3
                  text-sm text-[#5E5660]
                  transition-colors duration-300
                  hover:text-[#56044F]
                "
              >
                <span className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-white shadow-sm
                  transition-all duration-300
                  group-hover:bg-[#56044F]
                ">
                  <img
                    src={mail}
                    alt="Email"
                    className="h-4 w-4"
                  />
                </span>

                <span>ordeya.algeria@gmail.com</span>
              </a>

              <a
                href="#"
                className="
                  group flex items-center gap-3
                  text-sm text-[#5E5660]
                  transition-colors duration-300
                  hover:text-[#56044F]
                "
              >
                <span className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-white shadow-sm
                  transition-all duration-300
                  group-hover:bg-[#56044F]
                ">
                  <img
                    src={website}
                    alt="Website"
                    className="h-4 w-4"
                  />
                </span>

                <span>https://ordeya-ecommerce.vercel.app/</span>
              </a>

            </div>
          </div>


          {/* ================= NAVIGATION ================= */}
          <div className="hidden sm:flex sm:flex-col sm:items-start lg:pt-2">

            <h3 className="
              relative mb-6
              text-lg font-bold text-[#56044F]
            ">
              {t("navigation")}

              <span className="
                absolute -bottom-2 left-0
                h-0.5 w-8
                rounded-full bg-[#56044F]
              " />
            </h3>

            <nav className="grid grid-cols-2 gap-x-16 gap-y-3">

              <Link
                to="/"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("home")}
              </Link>

              <Link
                to="/orders"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("orders")}
              </Link>

              <Link
                to="/shop"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("shop")}
              </Link>

              <Link
                to="/wishlist"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("wishlist")}
              </Link>

              <Link
                to="/cart"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("cart")}
              </Link>
              <Link
                to="/checkout"
                className="
                  group flex items-center gap-2
                  text-sm font-medium text-[#5E5660]
                  transition-all duration-300
                  hover:translate-x-1
                  hover:text-[#56044F]
                "
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
                {t("checkout")}
              </Link>
            </nav>
          </div>


          {/* ================= MESSAGE ================= */}
          <div className="
            flex flex-col items-center
            justify-center
            rounded-3xl
            border border-white/80
            bg-white/50
            p-8
            text-center
            shadow-[0_10px_40px_rgba(86,4,79,0.05)]
            backdrop-blur-sm
          ">

            {/* Decorative quote */}
            <span className="
              mb-3 font-serif text-5xl
              leading-none text-[#56044F]/20
            ">
              “
            </span>

            <p
              dir="rtl"
              className="
                max-w-sm
                text-lg font-semibold
                leading-9 text-[#56044F]
                sm:text-xl
              "
            >
              {t('footerThankYou')}
              <br />
              {t('footerExperience')}
              <br />
              {t('footerEnjoyable')}
            </p>

            <span className="
              mt-4 h-1 w-10 rounded-full
              bg-[#56044F]
            " />

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="
          mt-12
          flex flex-col items-center justify-between
          gap-3
          border-t border-[#56044F]/10
          pt-6
          sm:flex-row
        ">

          <p className="text-xs text-[#6B626B] sm:text-sm">
            {t("copyright")}
          </p>

          <p className="text-xs text-[#6B626B]">
            {t("footerDesigned")}
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;