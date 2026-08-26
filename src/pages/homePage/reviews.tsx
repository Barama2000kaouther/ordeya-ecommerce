import { useState, useEffect } from 'react'

import comment from "../../assets/icons/features/comment.svg";
import right_chevron from "../../assets/icons/features/chevron.svg";
import left_chevron from "../../assets/icons/features/left-chevron.svg";

function Review() {
    const [currentReview, setCurrentReview] = useState(0)

    const [reviewsPerPage, setReviewsPerPage] = useState(
        window.innerWidth >= 1024 ? 3 : 1
    )

    const Reviews = [
        {
            id: 1,
            comment: 'The hijab is beautiful and the quality is excellent.',
            date: '2026-08-01',
        },
        {
            id: 2,
            comment:
                'Très satisfaite de ma commande ! Les vêtements sont de très bonne qualité et la livraison a été rapide.',
            date: '2026-08-01',
        },
        {
            id: 3,
            comment:
                'Très satisfaite de ma commande ! Les vêtements sont de très bonne qualité et la livraison a été rapide.',
            date: '2026-08-01',
        },
    ]

    // Change number of reviews when screen size changes
    useEffect(() => {
        const handleResize = () => {
            setReviewsPerPage(window.innerWidth >= 1024 ? 3 : 1)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // Reset current review when changing between mobile and desktop
    useEffect(() => {
        setCurrentReview(0)
    }, [reviewsPerPage])

    const visibleReviews = Reviews.slice(
        currentReview,
        currentReview + reviewsPerPage
    )

    // NEXT
    const nextReview = (): void => {
        setCurrentReview((current) => {
            const next = current + reviewsPerPage

            // Go back to the first review
            if (next >= Reviews.length) {
                return 0
            }

            return next
        })
    }

    // PREVIOUS
    const previousReview = (): void => {
        setCurrentReview((current) => {
            const previous = current - reviewsPerPage

            // Go to the last page
            if (previous < 0) {
                return Math.max(Reviews.length - reviewsPerPage, 0)
            }

            return previous
        })
    }

    return (
  <section className="relative overflow-hidden py-16 sm:py-20">

    {/* Decorative background */}
    <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-[#56044F]/5 blur-3xl" />
    <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#B099B5]/10 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-8">

      {/* Section heading */}
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56044F]">
          Testimonials
        </span>

        <h2
          className="mt-3 text-3xl font-bold text-[#1D1B1C] sm:text-4xl"
          dir="rtl"
        >
          آراء عملائنا
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          اكتشفي ما يقوله عملاؤنا عن تجربتهم معنا
        </p>
      </div>

      {/* Reviews + navigation */}
      <div className="flex items-center justify-center gap-3 sm:gap-6">

        {/* Previous */}
        <button
          type="button"
          onClick={previousReview}
          aria-label="Previous reviews"
          className="
            group flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full border border-gray-200 bg-white
            shadow-sm
            transition-all duration-300
            hover:-translate-x-1
            hover:border-[#56044F]
            hover:bg-[#56044F]
            hover:shadow-lg hover:shadow-[#56044F]/20
            active:scale-90
            sm:h-12 sm:w-12
          "
        >
          <img
            src={left_chevron}
            alt=""
            className="
              w-4 transition-all duration-300
              group-hover:brightness-0 group-hover:invert
              sm:w-5
            "
          />
        </button>

        {/* Reviews */}
        <div className="flex w-full max-w-5xl items-stretch justify-center gap-4 sm:gap-6">

          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="
                group relative flex w-full max-w-sm flex-col
                overflow-hidden rounded-2xl
                border border-white/80
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.09)]
                sm:min-h-55
                sm:p-7
              "
            >

              {/* Top accent */}
              <div
                className="
                  absolute left-0 top-0 h-1 w-full
                  bg-linear-to-r from-[#56044F] to-[#B099B5]
                  opacity-70
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />

              {/* Quote */}
              <div
                className="
                  absolute right-5 top-3
                  select-none
                  text-6xl font-serif
                  leading-none
                  text-[#56044F]/10
                "
              >
                "
              </div>

              {/* Header */}
              <div className="relative flex items-center justify-between">

                {/* Comment icon */}
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full bg-[#F6F0F5]
                    transition-all duration-300
                    group-hover:bg-[#56044F]
                  "
                >
                  <img
                    src={comment}
                    alt=""
                    className="
                      w-5 transition-all duration-300
                      group-hover:brightness-0 group-hover:invert
                    "
                  />
                </div>

                {/* Date */}
                <time
                  className="text-xs font-medium text-gray-400"
                >
                  {review.date}
                </time>
              </div>

              {/* Stars */}
              <div className="mt-5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-sm text-[#C59A3D]"
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p
                className="
                  mt-4 text-sm leading-7 text-gray-600
                  sm:text-base
                "
              >
                {review.comment}
              </p>

              {/* Bottom */}
              <div className="mt-auto pt-5">
                <div className="h-px w-full bg-gray-100" />

                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#56044F]">
                  Verified customer
                </p>
              </div>

            </article>
          ))}

        </div>

        {/* Next */}
        <button
          type="button"
          onClick={nextReview}
          aria-label="Next reviews"
          className="
            group flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full border border-gray-200 bg-white
            shadow-sm
            transition-all duration-300
            hover:translate-x-1
            hover:border-[#56044F]
            hover:bg-[#56044F]
            hover:shadow-lg hover:shadow-[#56044F]/20
            active:scale-90
            sm:h-12 sm:w-12
          "
        >
          <img
            src={right_chevron}
            alt=""
            className="
              w-4 transition-all duration-300
              group-hover:brightness-0 group-hover:invert
              sm:w-5
            "
          />
        </button>

      </div>

      {/* Pagination indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({
          length: Math.ceil(Reviews.length / reviewsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentReview(index * reviewsPerPage)}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${
                Math.floor(currentReview / reviewsPerPage) === index
                  ? "w-8 bg-[#56044F]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }
            `}
            aria-label={`Go to review page ${index + 1}`}
          />
        ))}
      </div>

    </div>
  </section>
)
}

export default Review