import { useEffect, useState } from "react";
import "./Preloader.css";
import logo from "../../assets/logo.svg";

export default function Preloader({ onFinish }) {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const scrollY = window.scrollY;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        const timer = setTimeout(() => {
            setHide(true);

            setTimeout(() => {
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";

                window.scrollTo(0, scrollY);
                sessionStorage.setItem("preloaderShown", "true");
                onFinish();
            }, 600);
        }, 2600);

        return () => clearTimeout(timer);
    }, [onFinish]);


    return (
        <div className={`preloader ${hide ? "preloader--hide" : ""}`}>
            <div className="preloader__content">
                <img src={logo} alt="Logo" className="preloader__logo" />
            </div>
        </div>
    );
}
