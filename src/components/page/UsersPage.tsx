import {useEffect, useState} from "react";
import apiClient from "../../api/ApiClient.ts";
import Sidebar from "../common/Sidebar.tsx";
import Header from "../common/Header.tsx";
import Footer from "../common/Footer.tsx";

interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const UsersPage = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            //TODO: remove timeout, this is only to see the loading animation
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await apiClient.get('/admin/users');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="wrapper">
                <Sidebar />

                <div className="main-panel">
                    <Header />

                    <div className="container">
                        <div className="page-inner">
                            <div className="page-header">
                                <h3 className="fw-bold mb-3">Zarządzanie użytkownikami</h3>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Wszyscy zarejestrowani użytkownicy</div>
                                        </div>
                                        <div className="card-body">
                                            {loading ? (
                                                <div className="text-center">
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Ładowanie...
                                                </div>
                                            ) : error ? (
                                                <div className="alert alert-danger">{error}</div>
                                            ) : (
                                                <table className="table table-head-bg-success">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Imię</th>
                                                        <th scope="col">Nazwisko</th>
                                                        <th scope="col">Email</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {users.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{user.email}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            )}
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

export default UsersPage;