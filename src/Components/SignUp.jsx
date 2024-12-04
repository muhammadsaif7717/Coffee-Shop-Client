import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //create user
    createUser(email, password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);

        // new user has created
        const createAt = result.user?.metadata?.creationTime;
        const user = { email, password, createAt };

        //using axios
        axios.post("https://coffee-shop-server-phi-flame.vercel.app/users", user)
          .then((data) => {
            console.log(data.data);
            if (data.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User  has been created",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

        //using fetch
        // fetch("https://coffee-shop-server-phi-flame.vercel.app/users", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(user),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data.insertedId) {
        //       Swal.fire({
        //         position: "center",
        //         icon: "success",
        //         title: "User  has been created",
        //         showConfirmButton: false,
        //         timer: 1500,
        //       });
        //     }
        //   });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
