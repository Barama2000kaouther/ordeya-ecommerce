import heroimage from "../../assets/images/heroimage.png";
import hero from "../../assets/images/hero.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative min-h-162.5 overflow-hidden ">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroimage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-110 blur-lg opacity-80"
        />

      </div>

      {/* Content */}
      <div
        className="relative mx-auto grid min-h-162.5 max-w-7xl
                   grid-cols-1 items-center gap-8 px-6 py-16
                   md:grid-cols-2 md:px-12 lg:px-20"
      >

        {/* Text */}
        <div
          className="z-20 flex flex-col items-center gap-6
                     text-center md:items-start md:text-right"
        >

          {/* Brand */}
          <p
            className="text-sm font-semibold uppercase tracking-[0.35em]
                       text-secondary"
          >
            ORDERYA
          </p>

          {/* Main heading */}
          <h1
            className="max-w-xl text-5xl font-black leading-[1.15]
                       text-text sm:text-6xl lg:text-7xl"
            dir="rtl"
          >
            ثقتك تبدأ
            <br />
            <span className="text-secondary">
              من لباسك
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-md text-lg leading-8 text-gray-800
                       md:text-xl"
            dir="rtl"
          >
            اكتشف مجموعتنا المميزة واختر إطلالتك التي تعكس
            أناقتك وشخصيتك.
          </p>

          {/* CTA */}
          <Link to="/shop">
            <button
              className="group relative mt-3 overflow-hidden rounded-full
                         bg-[#56044F] px-10 py-4 text-base font-bold
                         text-white shadow-lg shadow-[#56044F]/20
                         transition-all duration-300
                         hover:-translate-y-1 hover:bg-[#3f0339]
                         hover:shadow-xl hover:shadow-[#56044F]/30
                         active:translate-y-0"
            >
              <span className="relative z-10">
                تسوق الآن
              </span>

              {/* Button shine */}
              <span
                className="absolute inset-0 -translate-x-full
                           bg-white/10 transition-transform duration-500
                           group-hover:translate-x-full"
              />
            </button>
          </Link>

          {/* Small feature text */}
          <div
            className="mt-4 flex items-center gap-3 text-sm text-gray-900"
            dir="rtl"
          >
            <span className="h-2 w-2 rounded-full bg-secondary" />
            جودة • أناقة • ثقة
          </div>
        </div>

        {/* Product Image */}
        <div className="relative flex h-full min-h-100 items-center justify-center">

          {/* Glow behind product */}
          <div
            className="absolute h-80 w-80 rounded-full
                       bg-white/70 blur-3xl
                       md:h-105 md:w-105"
          />

          {/* Decorative circle */}
          <div
            className="absolute h-80 w-80 rounded-full
                       border border-text-secondary
                       md:h-112.5 md:w-112.5"
          />

          {/* Product */}
          <img
            src={hero}
            alt="Fashion product"
            className="relative z-10 max-h-120 w-auto
                       drop-shadow-[0_25px_35px_rgba(0,0,0,0.20)]
                       transition-transform duration-700
                       hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;