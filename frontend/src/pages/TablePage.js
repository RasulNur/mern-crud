import { useEffect } from "react";
import authStore from "../stores/authStore";
import Users from "../components/Users";
import Buttons from "../components/Buttons";

const TablePage = () => {
    const store = authStore();

    useEffect(() => {
        store.fetchUsers();
    }, []);

    return (
        <div>
            <Buttons />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                onChange={store.handleSelectAllCheckboxes}
                                checked={store.isCheckAll}
                            />
                        </th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registered</th>
                        <th>Authorized</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <Users />
            </table>
        </div>
    );
};

export default TablePage;
