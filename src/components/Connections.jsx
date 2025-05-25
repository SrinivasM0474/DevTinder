import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
    const connetions = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connetions || connetions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center pt-10">
                <p className="text-lg">No connections found.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-2">Your Connections</h1>
            <div className="flex items-center flex-col justify-around pt-4 flex-wrap">
                {
                    connetions.map((connection) => {
                        const { firstName, photoUrl, lastName, age, gender, about } = connection;
                        return (
                            <div className="flex items-center bg-gray-600 mb-8 border border-b-amber-950 shadow-2xl rounded-2xl px-4" key={connection._id}>
                                <div className='m-4'>
                                    <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-24 h-24 rounded-full mb-2" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white  mb-4">{firstName} {lastName} </h2>
                                    <p className="text-sm text-white mb-2 w-[250px]">{about}</p>
                                    {(age && gender) && <p className="text-sm text-white mb-2"> {age} {", "} {gender} </p>}
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Connections