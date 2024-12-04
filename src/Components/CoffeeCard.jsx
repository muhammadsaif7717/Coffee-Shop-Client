import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;

  const handleDelete = (_id) => {
    console.log(_id);

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
        //delete coffee
        fetch(`https://coffee-shop-server-phi-flame.vercel.app/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });

              const remaining = coffees.filter((cof) => cof._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <div className=" w-full h-full bg-base-100 shadow-xl flex items-center justify-center gap-5 p-5">
        <figure className="px-10 pt-10">
          <img src={photo} className="rounded-xl" />
        </figure>
        <div className=" space-y-3">
          <h2 className="card-title">{name}</h2>
          <p>{details}</p>
          <div className="space-y-1">
            <h1>Quantity: {quantity}</h1>
            <h1>Supplier: {supplier}</h1>
            <h1>Taste: {taste}</h1>
            <h1>Category: {category}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="btn btn-info border-none bg-amber-800 ">ℹ️</button>
          <Link to={`/update-coffee/${_id}`}>
            <button className="btn btn-success border-none">✏️</button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error border-none"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
CoffeeCard.propTypes = {
  coffee: Proptypes.node,
  coffees: Proptypes.node,
  setCoffees: Proptypes.node,
};
