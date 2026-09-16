import Header from "../../components/header";
import Footer from "../../components/footer";
import Products from "../../components/products.tsx";
import type { Product } from '../../types';

interface ProductPageProps {
    products: Product[];
  
}

function WishList({ products}: ProductPageProps) {

    return (
        <>
            <div className="mx-1 md:mx-4 ">
                <Header />
                <div className="my-10 flex flex-col items-center text-center">
                    <span className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B099B5] md:text-sm">
                        ORDERYA
                    </span>

                    <h1 className="animate-title bg-linear-to-r from-secondary via-[#8F5B88] to-secondary bg-clip-text text-2xl font-bold tracking-[0.15rem] text-transparent md:text-4xl md:tracking-[0.3rem]">
                        Mes favoris
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary md:text-base">
                        Retrouvez vos articles préférés et gardez-les à portée de main.
                    </p>

                    <span className="mt-5 h-1 w-12 rounded-full bg-secondary" />
                </div>
                <Products products={products}  />
                <br />
            </div>
            <Footer />
        </>
    )
}
export default WishList