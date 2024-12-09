import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header" data-background-color="dark">
                    <a href="../index.html" className="logo">
                        <img
                            src="../../../public/assets/img/kaiadmin/logo_light.svg"
                            alt="navbar brand"
                            className="navbar-brand"
                            height="20"
                        />
                    </a>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        <li className="nav-section">
                            <span className="sidebar-mini-icon">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                            <h4 className="text-section">Nawigacja</h4>
                        </li>
                        <li className={`nav-item ${isActive("/users") ? "active" : ""}`}>
                            <Link to="/users">
                                <i className="fas fa-user"></i>
                                <p>Użytkownicy</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/events") ? "active" : ""}`}>
                            <Link to="#">
                                <i className="fas fa-poo"></i>
                                <p>Eventy</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/some-link-1") ? "active" : ""}`}>
                            <Link to="#">
                                <i className="fas fa-pen-square"></i>
                                <p>Link</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/some-link-2") ? "active" : ""}`}>
                            <Link to="#">
                                <i className="fas fa-table"></i>
                                <p>Link</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/some-link-3") ? "active" : ""}`}>
                            <Link to="#">
                                <i className="fas fa-chart-pie"></i>
                                <p>Link</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;