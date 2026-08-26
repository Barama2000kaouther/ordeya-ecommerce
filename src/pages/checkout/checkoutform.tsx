import type Product from '../../types.ts';
import trash from '../../assets/icons/trash.svg';

interface ProductPageProps {
  products: Product[];
}

function CheckoutForm({ products }: ProductPageProps) {
  return (
    <form
      action=""
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1fr_360px] lg:gap-10"
    >
      {/* ================= LEFT : INFORMATION ================= */}
      <div className="rounded-2xl bg-white p-5 sm:p-7 md:p-8">
        
        <h1 className="mb-8 text-center text-2xl font-bold text-[#56044F]">
          Remplir les informations
        </h1>

        {/* Name + Last name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#5E5660]"
            >
              Nom
            </label>

            <input
              id="name"
              type="text"
              placeholder="Entrer votre nom"
              className="h-11 rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#56044F] outline-none placeholder:text-[#B099B5] focus:ring-1 focus:ring-[#B099B5]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="prenom"
              className="text-sm font-semibold text-[#5E5660]"
            >
              Prénom
            </label>

            <input
              id="prenom"
              type="text"
              placeholder="Entrer votre prénom"
              className="h-11 rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#56044F] outline-none placeholder:text-[#B099B5] focus:ring-1 focus:ring-[#B099B5]"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="telephone"
            className="text-sm font-semibold text-[#5E5660]"
          >
            Téléphone
          </label>

          <input
            id="telephone"
            type="tel"
            placeholder="Entrer votre numéro de téléphone"
            className="h-11 rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#56044F] outline-none placeholder:text-[#B099B5] focus:ring-1 focus:ring-[#B099B5]"
          />
        </div>

        {/* Country */}
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-[#5E5660]">
            Pays
          </p>

          <p className="text-sm font-semibold text-[#56044F]">
            Algeria
          </p>
        </div>

        {/* Wilaya */}
        <div className="mt-7 flex flex-col gap-2">
          <label
            htmlFor="wilaya"
            className="text-sm font-semibold text-[#5E5660]"
          >
            Wilaya
          </label>

          <select
            id="wilaya"
            name="wilaya"
            className="h-11 w-full cursor-pointer rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#B099B5] outline-none focus:ring-1 focus:ring-[#B099B5]"
          >
            <option value="">Choisir une wilaya</option>
            <option value="constantine">Constantine</option>
            <option value="mila">Mila</option>
            <option value="alger">Alger</option>
          </select>
        </div>

        {/* Commune */}
        <div className="mt-6 flex flex-col gap-2">
          <label
            htmlFor="commune"
            className="text-sm font-semibold text-[#5E5660]"
          >
            Commune
          </label>

          <select
            id="commune"
            name="commune"
            className="h-11 w-full cursor-pointer rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#B099B5] outline-none focus:ring-1 focus:ring-[#B099B5]"
          >
            <option value="">Sélectionner une commune</option>
            <option value="constantine">Constantine</option>
            <option value="mila">El Khroub</option>
            <option value="alger">Ali Mendjeli</option>
          </select>
        </div>
      </div>

      {/* ================= RIGHT : ORDER SUMMARY ================= */}
      <div className="h-fit rounded-2xl bg-[#B099B5] p-5 shadow-sm sm:p-6">
        
        <h2 className="mb-7 text-lg font-bold text-white">
          Total panier
        </h2>

        {/* Products */}
        <div className="flex flex-col gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3"
            >
              {/* Image */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-16 w-14 rounded-sm object-cover"
              />

              {/* Product name */}
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-[#56044F]">
                {product.name}
              </p>

              {/* Quantity */}
              <div className="flex shrink-0 items-center overflow-hidden rounded-md bg-white/80">
                <button
                  type="button"
                  className="px-2.5 py-1 text-sm font-semibold text-[#56044F] transition hover:bg-white"
                >
                  −
                </button>

                <span className="border-x border-[#B099B5]/40 px-2.5 py-1 text-sm font-semibold text-[#56044F]">
                  1
                </span>

                <button
                  type="button"
                  className="px-2.5 py-1 text-sm font-semibold text-[#56044F] transition hover:bg-white"
                >
                  +
                </button>
              </div>

              {/* Delete */}
              <button
                type="button"
                className="shrink-0 opacity-80 transition hover:scale-110 hover:opacity-100"
              >
                <img
                  src={trash}
                  alt="Supprimer"
                  className="h-4 w-4"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-base font-bold text-[#56044F]">
            Prix total
          </span>

          <span className="text-base font-semibold text-white">
            3800 DA
          </span>
        </div>

        {/* Delivery */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-base font-bold text-[#56044F]">
            Livraison
          </span>

          <span className="text-base font-semibold text-white">
            300 DA
          </span>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/30" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#56044F]">
            Total
          </span>

          <span className="text-lg font-bold text-white">
            4100 DA
          </span>
        </div>

        {/* Payment */}
        <p className="mt-5 text-sm font-semibold text-[#56044F]">
          Paiement à la livraison
        </p>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-[#56044F] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#43033E] hover:shadow-md"
        >
          Valider la commande
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;