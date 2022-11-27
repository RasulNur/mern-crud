import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
    loggedIn: null,
    users: null,
    isCheckAll: false,
    isCheck: [],
    loggedUser: null,

    loginForm: {
        email: "",
        password: "",
        name: "",
    },

    signupForm: {
        email: "",
        password: "",
        name: "",
    },

    handleSelectAllCheckboxes: () => {
        const { isCheckAll, users } = authStore.getState();
        set({
            isCheckAll: !isCheckAll,
            isCheck: users.map((li) => li._id),
        });
        if (isCheckAll) {
            set({ isCheck: [] });
        }
    },

    handleClickCheckbox: (e) => {
        const { isCheck } = authStore.getState();
        const { id, checked } = e.target;
        set({
            isCheck: [...isCheck, id],
        });
        if (!checked) {
            set({ isCheck: isCheck.filter((item) => item !== id) });
        }
    },

    fetchUsers: async () => {
        const res = await axios.get("/users");

        set({ users: res.data.users });
    },

    fetchUser: async () => {
        const { loginForm } = authStore.getState();

        await axios.get("/users", loginForm.email);
    },

    updateLoginForm: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                },
            };
        });
    },

    updateSignupForm: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,
                    [name]: value,
                },
            };
        });
    },

    login: async (e) => {
        const { loginForm } = authStore.getState();

        const res = await axios.post("/login", loginForm);

        if (res.data.isBlocked === true) {
            set({
                loggedIn: false,
                loginForm: {
                    email: "",
                    password: "",
                    name: "",
                },
            });
            alert("Вы заблокированы");
        } else if (res.data.isBlocked === false) {
            set({
                loggedIn: true,
                loggedUser: res.data,
                loginForm: {
                    email: "",
                    password: "",
                    name: "",
                },
                blockMessage: null,
            });
        }
    },

    checkAuth: async () => {
        try {
            await axios.get("/check-auth");
            set({ loggedIn: true });
        } catch (err) {
            set({ loggedIn: false });
        }
    },

    signup: async (e) => {
        const { signupForm } = authStore.getState();

        await axios.post("/signup", signupForm);

        set({
            signupForm: {
                email: "",
                password: "",
                name: "",
            },
        });
    },

    logout: async (e) => {
        await axios.get("/logout");
        set({ loggedIn: false });
    },

    deleteUsers: async () => {
        const { fetchUsers, checkAuth, isCheck } = authStore.getState();
        isCheck.forEach(async (id) => {
            await axios.delete(`/users/${id}`);
        });
        checkAuth();
        fetchUsers();
    },

    blockUsers: async () => {
        const { checkAuth, fetchUsers, isCheck, loggedUser } =
            authStore.getState();
        fetchUsers();
        isCheck.forEach(async (id) => {
            await axios.put(`/users/${id}`, { isBlocked: true });
        });
        fetchUsers();
        if (!loggedUser._id) {
            return;
        }
        fetchUsers();
        if (isCheck.includes(loggedUser._id)) {
            await axios.get("/logout");
            set({ loggedIn: false });

            checkAuth();
            set({ isCheck: [] });
        }
        checkAuth();
    },

    unblockUsers: () => {
        const { fetchUsers, isCheck } = authStore.getState();
        fetchUsers();
        isCheck.map(async (id) => {
            await axios.put(`/users/${id}`, { isBlocked: false });
        });
        fetchUsers();
    },
}));

export default authStore;
