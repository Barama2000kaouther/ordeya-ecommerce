import { useEffect, useState } from 'react';
import trash from '../../assets/icons/trash.svg';
import { supabase } from '../../supabase';
import type { CartItems } from '../../types';
import { increasequantity } from '../../util/cartfunction';
import { decreasequantity } from '../../util/cartfunction';
import { Deleteitem } from '../../util/cartfunction';
interface proptotal {
  Total: React.RefObject<number>;
}

function CartTable({ Total }: proptotal) {
  const [CartItems, setCartItems] = useState<CartItems[]>([]);
  const [refresh, setRefresh] = useState(0);

  
  useEffect(() => {
    const cartTotal = CartItems.reduce((total, item) => {
      const price = item.products?.price ?? 0;
      return total + price * item.quantity;
    }, 0);

    Total.current = cartTotal;
  }, [CartItems, refresh]);

  useEffect(() => {
    const fetchCartItem = async () => {
      const { data: cart_items, error } = await supabase
        .from('cart_items')
        .select(`*
          ,   products ( *,
            images:"product-images" ( id, url),
            colors:"product-color"( id, color ),
            sizes:"product-size"( id, size ))`);
      if (error) {
        console.log('the read error', error);
      }
      const combinedItems = cart_items ?? [];
      setCartItems(combinedItems);
    };
    fetchCartItem();
  }, [refresh]);

  return (
    <div className="w-full">
      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="border-b border-secondary/40">
            <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Produit
            </th>
            <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">

            </th>
            <th className="pb-4 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
              color
            </th>
            <th className="pb-4 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
              size
            </th>

            <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">
            </th>

            <th className="pb-4 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Prix
            </th>

            <th className="pb-4 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Quantité
            </th>

            <th className="pb-4 text-right text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Total
            </th>

            <th className="pb-4 w-10"></th>
          </tr>
        </thead>

        <tbody>

          {CartItems.map((item) => (

            <tr
              key={item.id}
              className="border-b border-gray-200 transition-colors hover:bg-secondary/5"
            >
              {/* Image */}
              <td className="py-5">
                <div className="h-20 w-16 overflow-hidden rounded-md">
                  <img
                    src={item.products.images[0].url}
                    alt={item.products.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>

              {/* Product name */}
              <td className="py-5">
                <p className="font-semibold text-secondary">
                  {item.products.name}
                </p>
              </td>
              {/* Product color */}
              <td className="py-5">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
              </td>
              {/* Product size */}
              <td className="py-5">
                <p className="font-semibold text-secondary">
                  {item.size}
                </p>
              </td>

              {/* Price */}
              <td className="py-5 text-center font-semibold text-text-3">
                {item.products.price} DZ
              </td>

              {/* Quantity */}
              <td className="py-5">
                <div className="mx-auto flex w-fit items-center overflow-hidden rounded-md border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-text-secondary transition hover:bg-secondary hover:text-white"
                    onClick={() => decreasequantity(item.id, item.quantity,setRefresh)}
                  >
                    −
                  </button>

                  <span className="min-w-8 border-x border-gray-300 px-2 py-1.5 text-center text-sm">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1.5 text-text-secondary transition hover:bg-secondary hover:text-white"
                    onClick={() => increasequantity(item.id, item.quantity,setRefresh)}
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Total */}
              <td className="py-5 text-right font-semibold text-text-3">
                {item.products.price * item.quantity} DZ
              </td>

              {/* Delete */}
              <td className="py-5 pl-4">
                <button
                  type="button"
                  className='hover:cursor-pointer'
                  onClick={() => Deleteitem(item.id,setRefresh)}
                >
                  <img
                    src={trash}
                    alt="Supprimer"
                    className="h-4 w-4 opacity-60 transition group-hover:opacity-100"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cart */}
      <div className="flex flex-col gap-4 md:hidden">
        {CartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b border-gray-200 pb-5"
          >
            <img
              src={item.products.images[0].url}
              alt={item.products.name}
              className="h-24 w-20 rounded-md object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-3">
                <div>
                  {/* Product name */}
                  <p className="font-semibold text-secondary">
                    {item.products.name}
                  </p>

                  {/* Color & Size */}
                  <div className="mt-2 flex items-center gap-4">
                    {/* Color */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">
                        Couleur:
                      </span>

                      <span
                        className="h-4 w-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>

                    {/* Size */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">
                        Taille:
                      </span>

                      <span className="text-sm font-semibold text-secondary">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => Deleteitem(item.id,setRefresh)}
                >
                  <img
                    src={trash}
                    alt="Supprimer"
                    className="h-5 w-5 hover:cursor-pointer"
                  />
                </button>
              </div>

              {/* Price + Quantity */}
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-text-3">
                  {item.products.price} DZ
                </span>

                <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-1"
                    onClick={() =>
                      decreasequantity(item.id, item.quantity,setRefresh)
                    }
                  >
                    −
                  </button>

                  <span className="border-x border-gray-300 px-3 py-1">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1"
                    onClick={() =>
                      increasequantity(item.id, item.quantity,setRefresh)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartTable;