import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function Appbar() {
    return <div className="border-b flex justify-between px-10 py-3 items-center">
        <Link to={"/blogs"}>
            <div className="font-bold text-xl cursor-pointer">
                Blogsite
            </div>
        </Link>
        <div className="flex justify-center">
            <Link to={"/publish"}>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 mr-8">New</button>
            </Link>
            <Avatar authorName={localStorage.getItem("name") || "?"} size="big" />
        </div>
    </div>
}