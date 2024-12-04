import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
    return (
        <div className="w-[95%] md:w-[85%] lg:w-[80%] mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Root;