import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UsersPage from "./components/page/UsersPage.tsx";
import AddUserPage from "./components/page/AddUserPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/add" element={<AddUserPage />} />
            </Routes>
        </BrowserRouter>
    )
}
