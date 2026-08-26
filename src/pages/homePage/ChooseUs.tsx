import pay from "../../assets/icons/features/pay.svg";
import fast_delevery from "../../assets/icons/features/fast-delivery.svg";
import mesuring from "../../assets/icons/features/measuring-tape.svg";
import quality from "../../assets/icons/features/quality.svg";

type Feature = {
  id: number;
  image: string;
  title: string;
};

const ChooseUs = () => {
  const features: Feature[] = [
    {
      id: 1,
      image: pay,
      title: "الدفع عند الاستلام وبعد المعاينة",
    },
    {
      id: 2,
      image: mesuring,
      title: "مقاسات كبيرة متوفرة",
    },
    {
      id: 3,
      image: fast_delevery,
      title: "توصيل سريع لجميع الولايات",
    },
    {
      id: 4,
      image: quality,
      title: "الجودة مضمونة",
    },
  ];

  return (
    <section className="relative mt-8 w-full overflow-hidden bg-linear-to-r from-surface via-white to-text-secondary py-3">
     

      {/* Top / bottom borders */}
     

      <div className="relative mx-auto max-w-7xl overflow-hidden">

        {/* Marquee */}
        <div className="flex w-max animate-marquee items-center">

          {[...features, ...features, ...features].map(
            (feature, index) => (
              <div
                key={`${feature.id}-${index}`}
                className="
                  group flex shrink-0 items-center
                  px-7 sm:px-10 lg:px-12
                "
              >

                {/* Icon */}
                <div
                  className="
                    relative flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-white
                    shadow-[0_4px_15px_rgba(86,4,79,0.08)]
                    transition-all duration-500
                    group-hover:bg-secondary
                    group-hover:shadow-[0_8px_25px_rgba(86,4,79,0.18)]
                  "
                >
                  <img
                    src={feature.image}
                    alt=""
                    className="
                      h-5 w-5 object-contain
                      transition-all duration-500
                      group-hover:brightness-0
                      group-hover:invert
                    "
                  />

               
                </div>

                {/* Text */}
                <p
                  dir="rtl"
                  className="
                    mr-4 whitespace-nowrap
                    ml-2
                    text-sm font-medium
                    text-text
                    transition-colors duration-300
                    group-hover:text-secondary
                    sm:text-[15px]
                  "
                >
                  {feature.title}
                </p>

                {/* Separator */}
                <div className="ml-7 h-8 w-px bg-text-secondary sm:ml-10" />

              </div>
            )
          )}

        </div>
      </div>
    </section>
  );
};

export default ChooseUs;