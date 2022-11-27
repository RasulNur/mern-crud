import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import TablePage from "../pages/TablePage";
import Navbar from "./Navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <TablePage />
                                </RequireAuth>
                            }
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
