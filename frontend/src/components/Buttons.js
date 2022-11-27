import authStore from "../stores/authStore";

const Buttons = () => {
    const store = authStore();

    return (
        <div className="btn-group mb-5">
            <button
                type="button"
                onClick={store.blockUsers}
                className="btn btn-secondary"
            >
                Block
            </button>
            <button
                type="button"
                onClick={store.unblockUsers}
                className="btn btn-secondary"
            >
                Unblock
            </button>
            <button
                type="button"
                onClick={store.deleteUsers}
                className="btn btn-secondary"
            >
                Delete
            </button>
        </div>
    );
};

export default Buttons;
