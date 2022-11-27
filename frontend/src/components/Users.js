import authStore from "../stores/authStore";
import User from "./User";

export default function Users() {
    const store = authStore();

    return (
        <tbody>
            {store.users &&
                store.users.map((user) => {
                    return <User user={user} key={user._id} />;
                })}
        </tbody>
    );
}
