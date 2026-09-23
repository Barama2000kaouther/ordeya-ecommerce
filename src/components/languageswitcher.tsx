
import { useState } from "react";
import languageIcon from "../assets/icons/internet.svg";
import translation from "../i18n.ts";

function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (language: "en" | "fr" | "ar") => {
        translation.changeLanguage(language);
        setIsOpen(false);
    };

    const currentLanguage =
        translation.language === "ar"
            ? "AR"
            : translation.language === "fr"
                ? "FR"
                : "EN";
  
    return (
        <div className="relative">
            {/* Language button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
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

                <span>{currentLanguage}</span>

                <span
                    className={`
            text-[10px] opacity-50
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
                >
                    ▼
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
            absolute right-0 top-12 z-50
            min-w-28
            rounded-xl
            border border-gray-100
            bg-white
            p-1
            shadow-lg
          "
                >
                    {/* English */}
                    <button
                        type="button"
                        onClick={() => changeLanguage("en")}
                        className="
              w-full rounded-lg px-4 py-2
              text-left text-sm
              hover:bg-[#F6EEF5]
              hover:text-[#56044F]
            "
                    >
                        English
                    </button>

                    {/* French */}
                    <button
                        type="button"
                        onClick={() => changeLanguage("fr")}
                        className="
              w-full rounded-lg px-4 py-2
              text-left text-sm
              hover:bg-[#F6EEF5]
              hover:text-[#56044F]
            "
                    >
                        Français
                    </button>

                    {/* Arabic */}
                    <button
                        type="button"
                        onClick={() => changeLanguage("ar")}
                        className="
              w-full rounded-lg px-4 py-2
              text-left text-sm
              hover:bg-[#F6EEF5]
              hover:text-[#56044F]
            "
                    >
                        العربية
                    </button>
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;

