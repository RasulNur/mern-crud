import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

const LoginForm = () => {
    const store = authStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await store.login();
        navigate("/");
    };

    return (
        <div
            className="w-100 m-auto border p-4 rounded bg-light"
            style={{ maxWidth: "380px" }}
        >
            <form onSubmit={handleLogin}>
                <div className="form-group mb-2">
                    <label className="form-label" name="email">
                        E-mail
                    </label>
                    <input
                        onChange={store.updateLoginForm}
                        value={store.loginForm.email}
                        type="email"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" name="name">
                        Password
                    </label>
                    <input
                        onChange={store.updateLoginForm}
                        value={store.loginForm.password}
                        type="password"
                        name="password"
                        autoComplete="on"
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" name="name">
                        Name
                    </label>
                    <input
                        onChange={store.updateLoginForm}
                        value={store.loginForm.name}
                        type="name"
                        name="name"
                        className="form-control"
                    />
                </div>

                <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                    <button type="submit" className="btn btn-primary mb-2 w-75">
                        Login
                    </button>
                    <Link className="mb-2" to="/signup">
                        Not have an account yet?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
