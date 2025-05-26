import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return
    try {
      const response = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-bold">No users found in the feed !!!</h2>
    </div>;
  }

  return feed && <div className="flex flex-col items-center justify-center py-10">
    <UserCard user={feed[0]} />
  </div>;
};

export default Feed;
