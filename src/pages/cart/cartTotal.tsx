function Totalcart() {
  return (
    <section className="h-fit rounded-2xl bg-text-secondary p-6 md:p-7">

      <h2 className="mb-8 text-lg font-semibold text-white">
        Total panier
      </h2>

      {/* Subtotal */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-surface font-bold">
          Prix total
        </span>

        <span className="text-sm font-medium text-text-3">
          3800 DZ
        </span>
      </div>

      {/* Delivery */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-surface font-bold">
            Livraison
          </span>

          <span className="text-sm font-medium text-white">
            300 DZ
          </span>
        </div>

        <select
          id="wilaya"
          name="wilaya"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 hover:border-white/30 focus:border-secondary"
        >
          <option value="" className="text-text-secondary">
            Choisir une wilaya
          </option>

          <option value="constantine" className="text-text-secondary">
            Constantine
          </option>

          <option value="mila" className="text-text-secondary">
            Mila
          </option>

          <option value="alger" className="text-text-secondary">
            Alger
          </option>
        </select>
      </div>

      {/* Divider */}
      <div className="my-7 border-t border-white/10" />

      {/* Total */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-surface font-bold">
            Total
          </p>

          <p className="mt-1 text-xs text-white">
            Livraison incluse
          </p>
        </div>

        <span className="text-2xl font-bold tracking-tight text-text-3">
          4100 DZ
        </span>
      </div>

      {/* Button */}
      <button
        type="button"
        className="mt-7 w-full rounded-lg bg-secondary px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90"
      >
        Acheter maintenant
      </button>

    </section>
  );
}

export default Totalcart;