import { useNavigate } from "react-router";
export default function SucessOrder() {
    const navigate = useNavigate();
    return (<>
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center bg-surface rounded-2xl p-8 shadow-lg">
                {/* Success icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-text mb-3">
                    Commande envoyée avec succès ! </h1>
                <p className="text-text-secondary mb-8"> Merci pour votre commande. Nous avons bien reçu votre demande et nous vous contacterons prochainement pour confirmer votre commande. </p>
                <button onClick={() => navigate("/")}
                    className="w-full rounded-xl bg-secondary px-6 py-3 text-white font-medium hover:opacity-90 transition" >
                    Retour à l'accueil </button>
            </div>
        </div>
    </>);
}