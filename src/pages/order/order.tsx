import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
export default function SucessOrder() {
    const { t } = useTranslation();
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
                    {t('orderSentSuccessfully')} </h1>
                <p className="text-text-secondary mb-8">
                    {t('orderConfirmationMessage')} </p>
                <button onClick={() => navigate("/")}
                    className="w-full rounded-xl bg-secondary px-6 py-3 text-white font-medium hover:opacity-90 transition" >
                    {t('backToHome')} </button>
            </div>
        </div>
    </>);
}