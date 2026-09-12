import Header from "../../components/header";
import Footer from "../../components/footer";
import Products from "../../components/products.tsx";
import type { Product } from '../../types';

interface ProductPageProps {
    products: Product[];
    userId?: string;
    refreshWishlist: () => void;
    wishlistCount: number;
    wishlist: Product[];
  

}

function Shop({ products, userId, refreshWishlist, wishlistCount, wishlist }: ProductPageProps) {
    return (
        <>
            <div className="mx-1 md:mx-4 ">
                <Header wishlistCount={wishlistCount} />
                <div className="my-10 flex flex-col items-center text-center">
                    <span className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-text-secondary md:text-sm">
                        ORDERYA
                    </span>

                    <h1 className="animate-title text-2xl font-bold tracking-[0.15rem] md:text-4xl md:tracking-[0.3rem] bg-linear-to-r from-secondary via-text-secondary to-secondary bg-clip-text text-transparent">
                        Découvrez notre collection
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary md:text-base">
                        Trouvez les pièces qui correspondent à votre style
                        et faites votre choix en toute simplicité.
                    </p>

                    <span className="mt-5 h-1 w-12 rounded-full bg-secondary" />
                </div>
                <Products products={products} userId={userId} refreshWishlist={refreshWishlist} />
                <br />
            </div>
            <Footer />
        </>
    )
}
export default Shop