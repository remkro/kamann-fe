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
    roles: { id: number; name: string }[];
    status: string;
}

const UsersPage = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 20,
    });

    useEffect(() => {
        fetchUsers();
    }, [pagination.currentPage, pagination.pageSize]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const { currentPage, pageSize } = pagination;
            const response = await apiClient.get(`/admin/users?page=${currentPage}&size=${pageSize}`);
            setUsers(response.data.content);
            setPagination((prev) => ({
                ...prev,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
            }));
        } catch (err: never) {
            console.error("Error fetching users:", err);
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(event.target.value, 10);
        setPagination((prev) => ({
            ...prev,
            pageSize: newSize,
            currentPage: 0,
        }));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 0; i < pagination.totalPages; i++) {
            buttons.push(
                <li key={i} className={`page-item ${pagination.currentPage === i ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }
        return buttons;
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
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Ładowanie...
                                                </div>
                                            ) : error ? (
                                                <div className="alert alert-danger">{error}</div>
                                            ) : (
                                                <>
                                                    <table className="table table-head-bg-success">
                                                        <thead>
                                                        <tr>
                                                            <th style={{width: "5%"}}>#</th>
                                                            <th style={{width: "20%"}}>Imię</th>
                                                            <th style={{width: "20%"}}>Nazwisko</th>
                                                            <th style={{width: "25%"}}>Email</th>
                                                            <th style={{width: "20%"}}>Role</th>
                                                            <th style={{width: "10%"}}>Status</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {users.map((user, index) => (
                                                            <tr key={user.id}>
                                                            <td>{pagination.currentPage * pagination.pageSize + index + 1}</td>
                                                                <td>{user.firstName}</td>
                                                                <td>{user.lastName}</td>
                                                                <td>{user.email}</td>
                                                                <td>
                                                                    {user.roles.map((role) => role.name).join(", ")}
                                                                </td>
                                                                <td>{user.status}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <nav>
                                                                <ul className="pagination pg-primary">
                                                                    <li className={`page-item ${pagination.currentPage === 0 ? "disabled" : ""}`}>
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                                            aria-label="Previous"
                                                                        >
                                                                            <span aria-hidden="true">&laquo;</span>
                                                                        </button>
                                                                    </li>
                                                                    {renderPaginationButtons()}
                                                                    <li className={`page-item ${pagination.currentPage === pagination.totalPages - 1 ? "disabled" : ""}`}>
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                                            aria-label="Next"
                                                                        >
                                                                            <span aria-hidden="true">&raquo;</span>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                        <div>
                                                            <span>
                                                                Strona {pagination.currentPage + 1} z {pagination.totalPages} (
                                                                {pagination.totalElements} użytkowników)
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pageSizeSelect" className="me-2">
                                                                Ilość wyników na stronę:
                                                            </label>
                                                            <select
                                                                id="pageSizeSelect"
                                                                value={pagination.pageSize}
                                                                onChange={handlePageSizeChange}
                                                                className="form-select"
                                                                style={{ width: "auto", display: "inline-block" }}
                                                            >
                                                                {[5, 10, 20, 50].map((size) => (
                                                                    <option key={size} value={size}>
                                                                        {size}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
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