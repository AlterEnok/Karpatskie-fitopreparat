import "./CertificatesPage.css";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

import cert1 from "../../assets/cert-1.jpg";
import cert2 from "../../assets/cert-2.jpg";

export default function CertificatesPage() {
    usePageTitle("Сертифікати");
    return (
        <>
            <div className="cert-page">
                <div className="cert-container">
                    <h1 className="cert-title">Сертифікати якості</h1>

                    <p className="cert-subtitle">
                        Ми дбаємо про безпеку та якість нашої продукції.
                        Уся продукція FitoKarpaty проходить необхідні перевірки
                        та відповідає встановленим стандартам.
                    </p>

                    <div className="cert-list">
                        <div className="cert-item">
                            <img src={cert1} alt="Сертифікат якості 1" />
                        </div>

                        <div className="cert-item">
                            <img src={cert2} alt="Сертифікат якості 2" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
