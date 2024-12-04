
import {  useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  console.log(loadedUsers);

  // useEffect(() => {
  //   axios.get('https://coffee-shop-server-phi-flame.vercel.app/users')
  //     .then(data => {
  //     console.log(data.data)
  //   })
  // }, [])




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
            //remaining
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        Users:{loadedUsers.length}
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
                  <th>{user.name ? user.nem : ""}</th>
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

export default Users;
