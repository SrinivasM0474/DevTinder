import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";


const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError(null);
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            }, {
                withCredentials: true,
            }
            )
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 1500); // Hide toast after 3 seconds
        } catch (error) {
            setError(error?.response?.data);
            console.error("Error saving profile:", error);
        }
    }


    return (
        <div className="flex items-center justify-around ">
            <div>
                <div className="flex justify-center items-center pt-10">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <div className="card-body items-center text-center bg-base-200">
                            <h2 className="card-title">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">First Name</legend>
                                    <input
                                        type="text"
                                        className="input outline-none outline-0"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">Last Name</legend>
                                    <input
                                        type="text"
                                        className="input outline-none"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">Photo URL</legend>
                                    <input
                                        type="text"
                                        className="input outline-none"
                                        value={photoUrl}
                                        onChange={(e) => {
                                            setPhotoUrl(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">Age</legend>
                                    <input
                                        type="text"
                                        className="input outline-none"
                                        value={age}
                                        onChange={(e) => {
                                            setAge(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">Gender</legend>
                                    <input
                                        type="text"
                                        className="input outline-none"
                                        value={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-left">About</legend>
                                    <input
                                        type="text"
                                        className="input outline-none"
                                        value={about}
                                        onChange={(e) => {
                                            setAbout(e.target.value);
                                        }}
                                    />
                                </fieldset>
                                <p className="text-red-500 text-sm">
                                    {error ? error : ""}
                                </p>
                            </div>

                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={saveProfile} >
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />

            {showToast && <div className="toast toast-top toast-end pt-[60px]">
                <div className="alert alert-success">
                    <span>Profile updated Successfully!!!</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile