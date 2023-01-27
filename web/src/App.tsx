import { BrowserRouter, Router } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthProvider";
import history from "./lib/history";
import RootRoutes from "./routes";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <RootRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
