import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";

export function RoutesMain() {
    return(
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    )
}