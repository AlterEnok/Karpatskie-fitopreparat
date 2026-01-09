import "./PopularProductsSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { products } from "../../data/products";
import { Link } from "react-router-dom";

function PopularProductsSection() {
    const popularProducts = products.slice(0, 3);

    return (
        <section className="popular">
            <h2 className="popular__title">Актуальні пропозиції</h2>

            <div className="popular__grid">
                {popularProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="popular__button-wrapper">
                <Link to="/catalog" className="popular__button">
                    Побачити все
                </Link>
            </div>
        </section>
    );
}

export default PopularProductsSection;
