import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./CheckoutPage.css";
import Footer from "../../components/Footer/Footer";
import usePageTitle from "../../hooks/usePageTitle";

const NOVA_API_KEY = "21241d3fdd6d054f8d1ded4eee99c437";

export default function CheckoutPage() {
    usePageTitle("Оформлення замовлення ");

    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [deliveryService, setDeliveryService] = useState("nova");
    const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | online



    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [citySearch, setCitySearch] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        city: "",
        cityRef: "",
        branch: "",
        ukrCity: "",
        ukrAddress: "",
    });

    // ===== Поиск городов НП =====
    useEffect(() => {
        if (deliveryService !== "nova" || citySearch.trim().length < 2) return;

        const fetchCities = async () => {
            const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    apiKey: NOVA_API_KEY,
                    modelName: "Address",
                    calledMethod: "getCities",
                    methodProperties: {
                        FindByString: citySearch,
                        Limit: 20,
                    },
                }),
            });

            const data = await res.json();
            if (data.success) setCities(data.data);
        };

        const delay = setTimeout(fetchCities, 400);
        return () => clearTimeout(delay);
    }, [citySearch, deliveryService]);


    // ===== Отделения НП =====
    useEffect(() => {
        if (!form.cityRef || deliveryService !== "nova") return;

        fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: NOVA_API_KEY,
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: { CityRef: form.cityRef },
            }),
        })
            .then(res => res.json())
            .then(data => data.success && setBranches(data.data));
    }, [form.cityRef, deliveryService]);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email) {
            alert("Заповніть контактні дані");
            return;
        }

        if (!form.phone) {
            alert("Вкажіть номер телефону для доставки");
            return;
        }


        const digits = form.phone.replace(/\D/g, "");

        if (digits.length !== 12) {
            alert("Введіть коректний номер телефону");
            return;
        }



        if (deliveryService === "nova" && (!form.city || !form.branch)) {
            alert("Оберіть місто та відділення Нової Пошти");
            return;
        }

        if (deliveryService === "ukr" && (!form.ukrCity || !form.ukrAddress)) {
            alert("Заповніть адресу Укрпошти");
            return;
        }

        if (deliveryService === "nova") {
            if (!form.city || !form.branch || !form.street || !form.house) {
                alert("Заповніть повну адресу для Нової Пошти");
                return;
            }
        }

        if (deliveryService === "ukr") {
            if (!form.ukrCity || !form.ukrIndex || !form.ukrStreet || !form.ukrHouse) {
                alert("Заповніть повну адресу для Укрпошти");
                return;
            }
        }

        const city =
            deliveryService === "nova"
                ? form.city
                : form.ukrCity;

        const orderData = {
            paymentMethod,
            deliveryService,
            city,
        };


        clearCart();
        navigate("/success", {
            state: orderData,
            replace: true,
        });
    };

    return (
        <>
            <div className="checkout-page">
                {/* LEFT */}
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Хто оформлює це замовлення?</h2>

                    <input placeholder="Імʼя" onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Прізвище" />
                    <input
                        type="tel"
                        placeholder="+380 67 123 45 67"
                        value={form.phone}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");


                            if (!value.startsWith("380")) {
                                value = "380";
                            }


                            value = value.slice(0, 12);


                            let formatted = "+380";

                            if (value.length > 3) formatted += " " + value.slice(3, 5);
                            if (value.length > 5) formatted += " " + value.slice(5, 8);
                            if (value.length > 8) formatted += " " + value.slice(8, 10);
                            if (value.length > 10) formatted += " " + value.slice(10, 12);

                            setForm({ ...form, phone: formatted });
                        }}
                    />


                    <input placeholder="Електронна пошта" onChange={e => setForm({ ...form, email: e.target.value })} />


                    <h3>Спосіб оплати</h3>

                    <div className="payment-switch">
                        <label className={paymentMethod === "cod" ? "active" : ""}>
                            <input
                                type="radio"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                            Накладений платіж
                        </label>

                        <label className={paymentMethod === "online" ? "active" : ""}>
                            <input
                                type="radio"
                                checked={paymentMethod === "online"}
                                onChange={() => setPaymentMethod("online")}
                            />
                            Онлайн-оплата
                        </label>
                    </div>


                    <h3>Куди доставляти?</h3>

                    {/* DELIVERY SWITCH */}
                    <div className="delivery-switch">
                        <label className={deliveryService === "nova" ? "active" : ""}>
                            <input
                                type="radio"
                                checked={deliveryService === "nova"}
                                onChange={() => setDeliveryService("nova")}
                            />
                            Нова Пошта
                        </label>

                        <label className={deliveryService === "ukr" ? "active" : ""}>
                            <input
                                type="radio"
                                checked={deliveryService === "ukr"}
                                onChange={() => setDeliveryService("ukr")}
                            />
                            Укрпошта
                        </label>
                    </div>

                    {/* NOVA */}
                    {deliveryService === "nova" && (
                        <>
                            <input
                                placeholder="Введіть своє місто"
                                value={citySearch}
                                onChange={(e) => {
                                    setCitySearch(e.target.value);
                                    setShowCityDropdown(true);
                                }}
                            />

                            {showCityDropdown && cities.length > 0 && (
                                <div className="dropdown">
                                    {cities.map(city => (
                                        <div
                                            key={city.Ref}
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    city: city.Description,
                                                    cityRef: city.Ref,
                                                });
                                                setCitySearch(city.Description);
                                                setShowCityDropdown(false);
                                            }}
                                        >
                                            {city.Description}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <select onChange={e => setForm({ ...form, branch: e.target.value })}>
                                <option value="">Оберіть відділення</option>
                                {branches.map(b => (
                                    <option key={b.Ref} value={b.Description}>
                                        {b.Description}
                                    </option>
                                ))}
                            </select>

                            <input
                                placeholder="Вулиця"
                                value={form.street}
                                onChange={e => setForm({ ...form, street: e.target.value })}
                            />

                            <input
                                placeholder="Будинок"
                                value={form.house}
                                onChange={e => setForm({ ...form, house: e.target.value })}
                            />
                        </>
                    )}

                    {/* UKR */}
                    {deliveryService === "ukr" && (
                        <>
                            <input
                                placeholder="Місто (введіть вручну)"
                                value={form.ukrCity}
                                onChange={e => setForm({ ...form, ukrCity: e.target.value })}
                            />

                            <input
                                placeholder="Поштовий індекс"
                                value={form.ukrIndex}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        ukrIndex: e.target.value.replace(/\D/g, "").slice(0, 5)
                                    })
                                }
                            />

                            <input
                                placeholder="Вулиця"
                                value={form.ukrStreet}
                                onChange={e => setForm({ ...form, ukrStreet: e.target.value })}
                            />

                            <input
                                placeholder="Будинок"
                                value={form.ukrHouse}
                                onChange={e => setForm({ ...form, ukrHouse: e.target.value })}
                            />
                        </>
                    )}

                    <button type="submit" className="checkout-submit">
                        {paymentMethod === "online"
                            ? "Перейти до оплати"
                            : "Оформити замовлення"}
                    </button>

                </form>

                {/* RIGHT */}
                <div className="checkout-summary">
                    <h3 className="summary-title">Ваше замовлення</h3>

                    <div className="summary-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-row">
                                <div className="summary-left">
                                    <img src={item.image} alt={item.name} />
                                    <div className="summary-info">
                                        <span className="summary-name">{item.title}</span>
                                        <span className="summary-sub">
                                            {item.subtitle || "Проти вірусів та простуди"}
                                        </span>
                                    </div>
                                </div>

                                <div className="summary-price">
                                    {item.price * item.quantity} грн
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-total">
                        <span>Загалом:</span>
                        <b>{totalPrice} грн</b>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
