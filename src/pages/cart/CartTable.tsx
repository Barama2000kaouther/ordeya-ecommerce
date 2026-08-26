import type Product from '../../types.ts';
import trash from '../../assets/icons/trash.svg';

interface ProductPageProps {
  products: Product[];
}

function CartTable({ products }: ProductPageProps) {
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
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 transition-colors hover:bg-secondary/5"
            >
              {/* Image */}
              <td className="py-5">
                <div className="h-20 w-16 overflow-hidden rounded-md">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>

              {/* Product name */}
              <td className="py-5">
                <p className="font-semibold text-secondary">
                  {product.name}
                </p>
              </td>

              {/* Price */}
              <td className="py-5 text-center font-semibold text-text-3">
                {product.price} DZ
              </td>

              {/* Quantity */}
              <td className="py-5">
                <div className="mx-auto flex w-fit items-center overflow-hidden rounded-md border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-text-secondary transition hover:bg-secondary hover:text-white"
                  >
                    −
                  </button>

                  <span className="min-w-8 border-x border-gray-300 px-2 py-1.5 text-center text-sm">
                    1
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1.5 text-text-secondary transition hover:bg-secondary hover:text-white"
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Total */}
              <td className="py-5 text-right font-semibold text-text-3">
                {product.price} DZ
              </td>

              {/* Delete */}
              <td className="py-5 pl-4">
                <button
                  type="button"
                
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
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 border-b border-gray-200 pb-5"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-24 w-20 rounded-md object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-3">
                <p className="font-semibold text-secondary">
                  {product.name}
                </p>

                <button type="button">
                  <img
                    src={trash}
                    alt="Supprimer"
                    className="h-5 w-5 "
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-3">
                  {product.price} DZ
                </span>

                <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-1"
                  >
                    −
                  </button>

                  <span className="border-x border-gray-300 px-3 py-1">
                    1
                  </span>

                  <button
                    type="button"
                    className="px-3 py-1"
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