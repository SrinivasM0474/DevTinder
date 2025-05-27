import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const checkNavigate = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/");
        }
    };
    return (
        <div>
            <div className="navbar bg-base-300 shadow-sm ">
                <div className="flex-1" onClick={checkNavigate}>
                    <a className="btn btn-ghost text-xl">DevTinder 🤘</a>
                </div>
                {user && (
                    <div className="flex gap-2 items-center">
                        <p className="mr-2 flex">
                            Welcome <b className="ml-1">{user?.firstName + " " + user?.lastName}</b>
                            {user.isPremium && <img
                                src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210.png"
                                alt="blue-tick"
                                className="w-6 h-6 ml-1"
                            />}
                        </p>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User photo" src={user?.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/connections">Connections</Link>
                                </li>
                                <li>
                                    <Link to="/requests">Requests</Link>
                                </li>
                                <li>
                                    <Link to="/premium">Premium</Link>
                                </li>
                                <li onClick={logoutHandler}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
