import { useParams } from 'react-router';
import type { Product } from '../../types';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Productdetail from './productdetail';
import { useTranslation } from 'react-i18next';
interface ProductPageProps {
    products: Product[];
}

function ProductPage({ products }: ProductPageProps) {
    const { t } = useTranslation();
    const { id } = useParams();

    const productId = id;

    const product = products.find(
        (product) => product.id === productId
    );


    return (
        <>
            <div className="mx-1 md:mx-4 ">
                <Header />
                <div className=" flex flex-col items-center text-center mt-5">
                    <span className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B099B5] md:text-sm">
                         {t('productDetails')}
                    </span>

                    <h1 className="animate-title bg-linear-to-r from-secondary via-[#8F5B88] to-secondary bg-clip-text text-2xl font-bold tracking-[0.15rem] text-transparent md:text-4xl md:tracking-[0.3rem]">
                        {t('discoverPiece')}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary md:text-base">
                        {t('productDescription')}
                    </p>

                    <span className="mt-5 h-1 w-12 rounded-full bg-secondary" />
                </div>
                {product && (
                    <Productdetail product={product} products={products} />
                )}
            </div>

            <Footer />
        </>
    );
}

export default ProductPage;