import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const data = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true },
            ); // Enable cookies for cross-origin requests
            dispatch(addUser(data?.data));
            navigate("/");
        } catch (error) {
            setError(
                error?.response?.data || "Something went wrong. Please try again.",
            );
        }
    };
    return (
        <div className="flex justify-center items-center pt-10">
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body items-center text-center bg-base-200">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-left">Email ID</legend>
                            <input
                                type="text"
                                className="input outline-none"
                                value={emailId}
                                onChange={(e) => {
                                    setEmailId(e.target.value);
                                }}
                            />
                        </fieldset>
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-left">Password</legend>
                        <input
                            type="text"
                            className="input outline-none"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </fieldset>
                    <p className="text-red-800">{error}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={loginHandler}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
