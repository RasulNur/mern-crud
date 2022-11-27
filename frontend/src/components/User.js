import authStore from "../stores/authStore";

export default function Note({ user }) {
    const store = authStore();

    return (
        <tr key={user._id}>
            <td>
                <input
                    type="checkbox"
                    id={user._id}
                    onChange={store.handleClickCheckbox}
                    checked={store.isCheck.includes(user._id)}
                />
            </td>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createdAt.substring(0, 19).split("T").join(" ")}</td>
            <td>{user.updatedAt.substring(0, 19).split("T").join(" ")}</td>
            <td>{user.isBlocked ? "Blocked" : "Unblocked"}</td>
        </tr>
    );
}
