import "./PopularProductsSection.css";
import ProductCard from "../ProductCard/ProductCard";
import productImg from "../../assets/product1.png"; // поставишь своё фото

const products = [
    {
        id: 1,
        title: "Антивірин Муршине дерево",
        subtitle: "Протидія вірусам та простуді",
        price: 1890,
        image: productImg,
    },
    {
        id: 2,
        title: "Антивірин Муршине дерево",
        subtitle: "Протидія вірусам та простуді",
        price: 1890,
        image: productImg,
    },
    {
        id: 3,
        title: "Антивірин Муршине дерево",
        subtitle: "Протидія вірусам та простуді",
        price: 1890,
        image: productImg,
    },
];

function PopularProductsSection() {
    return (
        <section className="popular">
            <h2 className="popular__title">Актуальні пропозиції</h2>

            <div className="popular__grid">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            <div className="popular__button-wrapper">
                <a href="/catalog" className="popular__button">Побачити все</a>
            </div>
        </section>
    );
}

export default PopularProductsSection;
