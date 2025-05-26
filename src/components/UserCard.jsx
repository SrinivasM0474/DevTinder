import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUsreFromFeed } from "../utils/feedSlice";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    if (!user) return null;
    const { photoUrl, about, firstName, lastName, age, gender, _id } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true },
            );
            dispatch(removeUsreFromFeed(userId));
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };
    return (
        <div className="card card-sm bg-base-500 w-96 shadow-xl border">
            <figure>
                <img src={photoUrl} alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age}{", "}{gender}</p>}
                <p className="py-1">{about}</p>
                <div className="card-actions justify-center mt-2">
                    {location.pathname !== "/profile" &&
                        <>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSendRequest("ignored", _id)}
                            >
                                Ignore
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleSendRequest("interested", _id)}
                            >
                                Interested
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserCard;
