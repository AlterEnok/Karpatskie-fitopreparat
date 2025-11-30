import HeroSlider from "../../components/HeroSlider/HeroSlider";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import PopularProductsSection from "../../components/PopularProductsSection/PopularProductsSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import Footer from "../../components/Footer/Footer";


const Home = () => {
    return (
        <>
            <HeroSlider />
            <CategoriesSection />
            <PopularProductsSection />
            <AboutSection />
            <Footer />
        </>
    );
};

export default Home;
