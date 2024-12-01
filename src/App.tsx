import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersPage from "./components/page/UsersPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </BrowserRouter>
    )
}
