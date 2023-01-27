import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { ProtectedLayout } from "./components/ProtectedLayout";

export default function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/home' element={<ProtectedLayout children={<Home />}/>}>       
            </Route>
        </Routes>
    );
}
