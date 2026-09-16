import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../../context/appcontext";
interface willayaProps {
  Total: number;
}
function Totalcart({ Total}: willayaProps) {
  const {willayas, CartItems }=useAppContext();
  const navigate = useNavigate();
  const [wilaya, setWilaya] = useState('');
  const [deleveryMode, setDeleveryMode] = useState('');
  const [error, setError] = useState("");
  const selectedWilaya = willayas.find(
    (item) => item.wilaya === wilaya
  );
  const deliveryPrice =
    deleveryMode === "home"
      ? selectedWilaya?.home_delevery_classic ?? 0
      : deleveryMode === "office"
        ? selectedWilaya?.office_delevery_classique ?? 0
        : 0;
  const handleBuy = () => {
    if (CartItems.length === 0) {
      setError('Votre panier est vide.');
      return;
    }

    if (!wilaya || !deleveryMode) {
      setError("Veuillez choisir une wilaya et un mode de livraison.");
      return;
    }
    // Everything is valid 
    setError("");
    navigate("/checkout");
  };
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
          {Total} DZ
        </span>
      </div>

      {/* Delivery */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-surface font-bold">
            Livraison
          </span>

          <span className="text-sm font-medium text-white">
            {deliveryPrice} DZ
          </span>
        </div>

        <select
          id="wilaya"
          name="wilaya"
          value={wilaya}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 hover:border-white/30 focus:border-secondary"
          onChange={(e) => setWilaya(e.target.value)}
        >
          <option value="" className="text-text-secondary">
            Choisir une wilaya
          </option>
          {
            willayas.map((wilaya) => {
              return (<option key={wilaya.id} value={wilaya.wilaya} className="text-text-secondary">
                {wilaya.wilaya}
              </option>);
            })
          }
        </select>

        <select
          id="delivery-type"
          name="delivery-type"
          value={deleveryMode}
          className="w-full mt-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 hover:border-white/30 focus:border-secondary"
          onChange={(e) => setDeleveryMode(e.target.value)}
        >
          <option value="" className="text-text-secondary">
            Choisir le mode de livraison
          </option>

          <option value="home" className="text-black">
            À domicile
          </option>

          <option value="office" className="text-black">
            Au bureau
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
          {Total + deliveryPrice} DZ
        </span>
      </div>

      {/* Button */}
      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-error">
          {error}
        </p>
      )}
      <button
        type="button"
        className="mt-7 w-full rounded-lg bg-secondary px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90"
        onClick={handleBuy}
      >
        Acheter maintenant
      </button>

    </section>
  );
}

export default Totalcart;