import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequest(res?.data?.connectionRequests));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {
        withCredentials: true,
      })
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-lg">No Connections Requests found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-2">Your Connections Requests</h1>
      <div className="flex items-center flex-col justify-around pt-4 flex-wrap">
        {
          requests.map((request) => {
            const { firstName, photoUrl, lastName, age, gender, about, _id } = request.fromUserId;
            return (
              <div className="flex items-center justify-between flex-wrap w-2/3 bg-gray-600 mb-8 border border-b-amber-950 shadow-2xl rounded-2xl p-4" key={request._id}>
                <div className='m-4 flex items-center'>
                  <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-24 h-24 rounded-full mb-2 mr-5" />
                  <div>
                    <h2 className="text-lg font-semibold text-white  mb-4">{firstName} {lastName} </h2>
                    <p className="text-sm text-white mb-2">{about}</p>
                    {(age && gender) && <p className="text-sm text-white mb-2"> {age} {", "} {gender} </p>}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button className="btn btn-primary mr-2.5" onClick={() => { reviewRequest("rejected", request._id) }}>Reject</button>
                  <button className="btn btn-secondary" onClick={() => { reviewRequest("accepted", request._id) }}>Accept</button>
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
};

export default Requests;
