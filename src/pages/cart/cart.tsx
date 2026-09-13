import Header from "../../components/header";
import Footer from "../../components/footer";
import CartTable from "./CartTable.tsx";
import type { WilayaTarif } from "../../types";
import Totalcart from "./cartTotal.tsx";
import { useState } from "react";
interface ProductPageProps {
    willays:WilayaTarif[];
    wishlistCount:number;
}


function Cart({ willays ,wishlistCount}: ProductPageProps) {
   const [Total,setTotal]=useState(0);
    return (
        <>
            <div className="mx-1 md:mx-4 ">
                <Header  wishlistCount={wishlistCount} />
                <div className="my-10 flex flex-col items-center text-center">

                    <h1 className="animate-title bg-linear-to-r from-secondary via-text-secondary to-secondary bg-clip-text text-2xl font-bold tracking-[0.15rem] text-transparent md:text-4xl md:tracking-[0.3rem]">
                        Votre panier
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary md:text-base">
                        Découvrez les pièces que vous avez choisies
                        et préparez votre commande.

                    </p>

                    <span className="mt-5 h-1 w-12 rounded-full bg-secondary" />

                </div>
                <div className="mx-auto my-10 grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-[1fr_380px] lg:gap-12">
                    <CartTable setTotal={setTotal}/>
                    <Totalcart willays={willays} Total={Total} />
                </div>

            </div>
            <Footer />
        </>
    )
}
export default Cart