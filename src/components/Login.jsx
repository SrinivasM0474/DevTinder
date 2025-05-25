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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
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
            return navigate("/");
        } catch (error) {
            setError(
                error?.response?.data || "Something went wrong. Please try again.",
            );
        }
    };

    const signupHandler = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                { withCredentials: true },
            ); // Enable cookies for cross-origin requests
            dispatch(addUser(res?.data?.data));
            return navigate("/profile");
        } catch (error) {
            setError(
                error?.response?.data || "Something went wrong. Please try again.",
            );
        }
    }
    return (
        <div className="flex justify-center items-center py-10">
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body items-center text-center bg-base-200">
                    <h2 className="card-title font-bold">
                        {isLoginForm ? "Login" : "Signup"}
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            loginHandler();
                        }}
                    >
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">
                                        First Name
                                    </legend>
                                    <input
                                        type="text"
                                        className="input focus:outline-hidden"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">
                                        Last Name
                                    </legend>
                                    <input
                                        type="text"
                                        className="input focus:outline-hidden"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </fieldset>
                            </>
                        )}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-left">Email ID</legend>
                            <input
                                type="text"
                                className="input focus:outline-hidden"
                                value={emailId}
                                onChange={(e) => {
                                    setEmailId(e.target.value);
                                }}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-left">Password</legend>
                            <input
                                type="password"
                                className="input focus:outline-hidden"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </fieldset>
                    </form>
                    <p className="text-red-800">{error}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={isLoginForm ? loginHandler : signupHandler}>
                            {isLoginForm ? "Login" : "Signup"}
                        </button>
                    </div>
                    <p
                        onClick={() => {
                            setIsLoginForm((value) => !value);
                        }}
                        className="cursor-pointer mt-2"
                    >

                        {isLoginForm ? "New User? SIgnup Here" : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
