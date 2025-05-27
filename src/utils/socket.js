// import { io } from "socket.io-client";
// import { BASE_URL } from "./constants";

// export const createSocketConnection = () => {
//   return io(BASE_URL);
// };

import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

// Simple function to get a cookie by name
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

export const createSocketConnection = () => {
  const token = getCookie("token");

  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      auth: {
        token: token,
      },
    });
  } else {
    return io("/", {
      path: "/api/socket.io",
      auth: {
        token: token,
      },
    });
  }
};
