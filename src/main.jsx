import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AddCoffee from "./Components/AddCoffee.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import SignUp from "./Components/SignUp.jsx";
import SignIn from "./Components/SignIn.jsx";
import Root from "./Components/Root.jsx";
import Users from "./Components/Users.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Users2 from "./Components/Users2.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://coffee-shop-server-phi-flame.vercel.app/coffee"),
      },
      {
        path: "/add-coffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/update-coffee/:id",
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) =>
          fetch(`https://coffee-shop-server-phi-flame.vercel.app/coffee/${params.id}`),
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/users",
        element: <Users></Users>,
        loader: () => fetch("https://coffee-shop-server-phi-flame.vercel.app/users"),
      },
      {
        path: "/users2",
        element: <Users2></Users2>,
      },
    ],
  },
]);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    < QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
