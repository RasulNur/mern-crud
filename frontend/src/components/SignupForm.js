import authStore from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
const SignupForm = () => {
    const store = authStore();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        await store.signup();
        navigate("/login");
    };

    return (
        <div
            className="w-100 m-auto border p-4 rounded bg-light"
            style={{ maxWidth: "380px" }}
        >
            <form onSubmit={handleSignup}>
                <div className="form-group mb-2">
                    <label className="form-label" name="email">
                        E-mail
                    </label>
                    <input
                        onChange={store.updateSignupForm}
                        value={store.signupForm.email}
                        type="email"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" name="password">
                        Password
                    </label>
                    <input
                        onChange={store.updateSignupForm}
                        value={store.signupForm.password}
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
                        onChange={store.updateSignupForm}
                        value={store.signupForm.name}
                        type="name"
                        name="name"
                        className="form-control"
                    />
                </div>

                <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                    <button type="submit" className="btn btn-primary mb-2 w-75">
                        Signup
                    </button>
                    <Link className="mb-2" to="/signup">
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
