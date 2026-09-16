import { useState, useEffect } from 'react';
import trash from '../../assets/icons/trash.svg';
import { supabase } from '../../supabase';
import type { Commune } from '../../types';
import { increasequantity } from '../../util/cartfunction';
import { decreasequantity } from '../../util/cartfunction';
import { Deleteitem } from '../../util/cartfunction';
import { useAppContext } from '../../context/appcontext';
import { useNavigate } from 'react-router';

function CheckoutForm() {
  const { willayas, userId, CartItems,setCartItems } = useAppContext();
  const navigate = useNavigate();

  const [wilaya, setWilaya] = useState('');
  const [deleveryMode, setDeleveryMode] = useState('');
  const [commune, setCommune] = useState<Commune[] | null>([]);
  const [subTotal, setsubTotal] = useState(0);
  const [Name, setName] = useState('');
  const [error, setError] = useState("");
  const [phone, setphone] = useState('');
  const [adress, setadress] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  // Find the Wilaya object that matches the selected Wilaya
  const selectedWilaya = willayas.find(
    (item) => item.wilaya === wilaya
  );

  // Calculate the delivery price based on the selected delivery method
  const deliveryPrice =
    deleveryMode === "home"
      ? selectedWilaya?.home_delevery_classic ?? 0
      : deleveryMode === "office"
        ? selectedWilaya?.office_delevery_classique ?? 0
        : 0;
  // Get communes from Supabase where wilaya_id
  // matches the selected Wilaya
  const getCommunesByWilaya = async (wilaya: number) => {
    if (!wilaya) {
      setCommune([]);
      return;
    }
    const { data: communes, error } = await supabase
      .from('communes')
      .select("*")
      .eq('wilaya_id', wilaya);
    if (error) {
      console.log('the error is :', error);
    }
    setCommune(communes);
  }

  // Calculate the cart subtotal whenever cart items change
  useEffect(() => {
    const cartTotal = CartItems.reduce((total, item) => {
      const price = item.products?.price ?? 0;
      return total + price * item.quantity;
    }, 0);

    setsubTotal(cartTotal);
  }, [CartItems]);

  // Create a new order
  const createOrder = async () => {
    // Clear previous error
    setError("");

    // Validate cart
    if (CartItems.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    // Validate name
    if (!Name.trim()) {
      setError("Veuillez entrer votre nom.");
      return;
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      setError("Le numéro de téléphone doit contenir exactement 10 chiffres.");
      return;
    }

    // Validate Wilaya
    if (!wilaya) {
      setError("Veuillez choisir une wilaya.");
      return;
    }

    // Validate commune
    if (!selectedCommune) {
      setError("Veuillez choisir une commune.");
      return;
    }

    // Validate delivery mode
    if (!deleveryMode) {
      setError("Veuillez choisir un mode de livraison.");
      return;
    }

    // Address is required only for home delivery
    if (deleveryMode === "home" && !adress.trim()) {
      setError("Veuillez entrer votre adresse.");
      return;
    }
    // Insert the customer's order into the orders table
    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          name: Name,
          wilaya: wilaya,
          commune: selectedCommune,
          address: adress,
          telephone: phone,
          delivery_type: deleveryMode,
          delivery_price: deliveryPrice,
          subtotal: subTotal,
          total: subTotal + deliveryPrice,
        },
      ]).select().single();

    if (error) {
      console.log(error);
      return;
    }
    console.log('the order has been created', order);

    //Create order_items from cart_items
    const orderItems = CartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products.name,
      quantity: item.quantity,
      price: item.products.price,
      color: item.color,
      size: item.size,
    }));

    //  Insert all order items
    const { data: order_item, error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems).select();

    if (orderItemsError) {
      console.log(orderItemsError);
      return;
    }
    console.log("the order item", order_item);
    console.log("Order created successfully");
    //  Get the user's cart
    const { data: cart, error: cartError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (cartError) {
      console.log("Cart error:", cartError);
      return;
    }

    //  Delete cart items
    const { error: cartItemsError } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id);

    if (cartItemsError) {
      console.log("Cart items delete error:", cartItemsError);
      return;
    }
    // delete the cartitem
    setCartItems([]);
    // Delete the cart
    const { error: deleteCartError } = await supabase
      .from("cart")
      .delete()
      .eq("id", cart.id);

    if (deleteCartError) {
      console.log("Cart delete error:", deleteCartError);
      return;
    }

    const { error: errorsendorder } = await supabase.functions.invoke("send_order_email", {
      body: {
        order: order,
        orderItems: order_item,
      },
    });

    if (error) {
      console.error("Function error:", errorsendorder);
    }

    navigate("/order");
  }

  return (
    <div
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1fr_360px] lg:gap-10"
    >
      {/* ================= LEFT : INFORMATION ================= */}
      <div className="rounded-2xl bg-white p-5 sm:p-7 md:p-8">

        <h1 className="mb-8 text-center text-2xl font-bold text-[#56044F]">
          Remplir les informations
        </h1>

        {/* Name  */}

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
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrer votre nom"
            className="h-11 rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#56044F] outline-none placeholder:text-[#B099B5] focus:ring-1 focus:ring-[#B099B5]"
          />
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
            minLength={10}
            maxLength={10}
            value={phone}
            onChange={(e) => setphone(e.target.value)}
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
            onChange={(e) => {
              const selected = willayas.find(
                (item) => item.wilaya === e.target.value
              );

              if (selected) {
                setWilaya(selected.wilaya);
                getCommunesByWilaya(selected.id);
              }
            }}
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
            value={selectedCommune}
            onChange={(e) => setSelectedCommune(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#B099B5] outline-none focus:ring-1 focus:ring-[#B099B5]"
          >
            <option value="">Sélectionner une commune</option>
            {commune?.map((comune) => {
              return (<option key={comune.id} value={comune.commune} className="text-text-secondary">
                {comune.commune}
              </option>)
            })}
          </select>
        </div>
        {/* lieu de la livraison */}
        <div className="mt-7 flex flex-col gap-2">
          <label
            htmlFor="wilaya"
            className="text-sm font-semibold text-[#5E5660]"
          >
            lieu de la livraison
          </label>

          <select
            id="wilaya"
            name="wilaya"
            className="h-11 w-full cursor-pointer rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#B099B5] outline-none focus:ring-1 focus:ring-[#B099B5]"
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
        {/* adress */}

        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="adress"
            className="text-sm font-semibold text-[#5E5660]"
          >
            adress
          </label>

          <input
            id="adress"
            type="text"
            value={adress}
            onChange={(e) => setadress(e.target.value)}
            placeholder="Entrer votre adress"
            className="h-11 rounded-md bg-[#F8F0F8] px-3 text-sm font-medium text-[#56044F] outline-none placeholder:text-[#B099B5] focus:ring-1 focus:ring-[#B099B5]"
          />
        </div>
      </div>

      {/* ================= RIGHT : ORDER SUMMARY ================= */}
      <div className="h-fit rounded-2xl bg-[#B099B5] p-5 shadow-sm sm:p-6">

        <h2 className="mb-7 text-lg font-bold text-white">
          Total panier
        </h2>

        {/* Products */}
        <div className="flex flex-col gap-5">
          {CartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3"
            >
              {/* Image */}
              <img
                src={item.products.images[0].url}
                alt={item.products.name}
                className="h-16 w-14 rounded-sm object-cover"
              />

              {/* Product name */}
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-[#56044F]">
                {item.products.name}
              </p>

              <div
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>

              {/* Product size */}
              <p className="font-semibold text-secondary">
                {item.size}
              </p>

              {/* Quantity */}
              <div className="flex shrink-0 items-center overflow-hidden rounded-md bg-white/80">
                <button
                  type="button"
                  className="px-2.5 py-1 text-sm font-semibold text-[#56044F] transition hover:bg-white"
                  onClick={() => decreasequantity(item.id, item.quantity, setCartItems)}
                >
                  −
                </button>

                <span className="border-x border-[#B099B5]/40 px-2.5 py-1 text-sm font-semibold text-[#56044F]">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="px-2.5 py-1 text-sm font-semibold text-[#56044F] transition hover:bg-white"
                  onClick={() => increasequantity(item.id, item.quantity, setCartItems)}
                >
                  +
                </button>
              </div>

              {/* Delete */}
              <button
                type="button"
                className="shrink-0 opacity-80 transition hover:scale-110 hover:opacity-100"
                onClick={() => Deleteitem(item.id, setCartItems)}
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
            {subTotal} DA
          </span>
        </div>

        {/* Delivery */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-base font-bold text-[#56044F]">
            Livraison
          </span>

          <span className="text-base font-semibold text-white">
            {deliveryPrice} DA
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
            {subTotal + deliveryPrice} DA
          </span>
        </div>

        {/* Payment */}
        <p className="mt-5 text-sm font-semibold text-[#56044F]">
          Paiement à la livraison
        </p>
        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-error">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="mt-6 w-full rounded-md bg-[#56044F] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#43033E] hover:shadow-md"
          onClick={() => createOrder()}
        >
          Valider la commande
        </button>
      </div>
    </div>

  );
}

export default CheckoutForm;