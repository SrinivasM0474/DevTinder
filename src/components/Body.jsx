import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            }
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className="h-[calc(100vh-130px)] overflow-y-auto">

                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body