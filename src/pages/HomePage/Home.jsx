import HeroSlider from "../../components/HeroSlider/HeroSlider";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import PopularProductsSection from "../../components/PopularProductsSection/PopularProductsSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

const Home = () => {
    usePageTitle("Головна");

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
