import { useState } from "react";
import Sidebar from "../common/Sidebar.tsx";
import Header from "../common/Header.tsx";
import Footer from "../common/Footer.tsx";
import apiClient from "../../api/ApiClient.ts";

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [emailValid, setEmailValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValid(emailRegex.test(value));
        }

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailValid) {
            setError("Podaj poprawny adres email.");
            return;
        }

        try {
            setError("");
            setSuccess("");

            await apiClient.post("/admin/users/register", formData);

            setSuccess("Użytkownik został dodany pomyślnie!");
            setFormData({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                role: "",
            });
        } catch (error) {
            setError(error.response?.data?.message || "Wystąpił błąd podczas dodawania użytkownika.");
        }
    };

    const isFormValid =
        formData.email.length >= 3 &&
        emailValid &&
        formData.password.length >= 3 &&
        formData.firstName.length >= 3 &&
        formData.lastName.length >= 3 &&
        formData.role !== "";

    return (
        <>
            <div className="wrapper">
                <Sidebar />

                <div className="main-panel">
                    <Header />

                    <div className="container">
                        <div className="page-inner">
                            <div className="page-header">
                                <h3 className="fw-bold mb-3">Dodawanie użytkownika</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Wypełnij formularz</div>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="email">Adres email</label>
                                                    <input
                                                        type="email"
                                                        className={`form-control ${!emailValid ? "is-invalid" : ""}`}
                                                        id="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Wprawadź email"
                                                    />
                                                    {!emailValid && (
                                                        <div className="invalid-feedback">Podaj poprawny adres email.</div>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Hasło</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Wprowadź hasło"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="firstName">Imię</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        placeholder="Wprowadź imię"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Nazwisko</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Wprowadź nazwisko"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="role">Rola</label>
                                                    <select
                                                        className="form-select"
                                                        id="role"
                                                        value={formData.role}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Wybierz rolę</option>
                                                        <option value="ADMIN">Admin</option>
                                                        <option value="INSTRUCTOR">Instruktor</option>
                                                        <option value="CLIENT">Klient</option>
                                                    </select>
                                                </div>
                                                <div className="card-action">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success me-2"
                                                        disabled={!isFormValid} // Disable button if form is invalid
                                                    >
                                                        Wyślij
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            setFormData({
                                                                email: "",
                                                                password: "",
                                                                firstName: "",
                                                                lastName: "",
                                                                role: "",
                                                            })
                                                        }
                                                    >
                                                        Anuluj
                                                    </button>
                                                </div>
                                            </form>
                                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                                            {success && <div className="alert alert-success mt-3">{success}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    );
};

export default AddUserPage;