import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const Users2 = () => {
    const { isPending, isError,error ,data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get('https://coffee-shop-server-phi-flame.vercel.app/users/')
            .then(res => res.data)
    });
    console.log(users)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://coffee-shop-server-phi-flame.vercel.app/users/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete user.",
                            icon: "error",
                        });
                    });
            }
        });
    };


    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p>{ error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold">
                Users
            </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Create At</th>
                                <th>Last Login Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name ? user.name : ""}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createAt}</td>
                                    <td>{user.lastLogInTime}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-error"
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users2;
