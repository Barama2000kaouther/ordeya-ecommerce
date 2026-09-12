import { useParams } from 'react-router';
import type {Product} from '../../types';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Productdetail from './productdetail';
interface ProductPageProps {
    products: Product[];
    wishlistCount:number;
     userId?: string;
    refreshWishlist: () => void;
    wishlist: Product[];
}

function ProductPage({ products ,wishlistCount,userId,refreshWishlist,wishlist}: ProductPageProps) {
    const { id } = useParams();

    const productId =id;

    const product = products.find(
        (product) => product.id === productId
    );


    return (
        <>
            <div className="mx-1 md:mx-4 ">
                <Header wishlistCount={wishlistCount} />
                <div className=" flex flex-col items-center text-center mt-5">
                    <span className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B099B5] md:text-sm">
                        DÉTAIL DU PRODUIT
                    </span>

                    <h1 className="animate-title bg-linear-to-r from-secondary via-[#8F5B88] to-secondary bg-clip-text text-2xl font-bold tracking-[0.15rem] text-transparent md:text-4xl md:tracking-[0.3rem]">
                        Découvrez votre pièce
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary md:text-base">
                        Explorez les détails, choisissez votre taille et votre couleur, puis
                        ajoutez votre article à votre panier.
                    </p>

                    <span className="mt-5 h-1 w-12 rounded-full bg-secondary" />
                </div>
                {product && (
                    <Productdetail product={product} userId={userId} refreshWishlist={refreshWishlist} wishlist={wishlist}/>
                )}
            </div>

            <Footer />
        </>
    );
}

export default ProductPage;