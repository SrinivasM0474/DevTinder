import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();
  const userId = user?._id;

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  }

  const token = getCookie("token");
  console.log("Token:", token);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    //As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { firstName, text }]);
      // console.log(firstName + " : " + text);
    });
    return () => {
      // Cleanup the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="border shadow-2xl h-[70vh] w-1/2 mx-auto  border-grey-600 my-5 relative">
      <h1 className="text-2xl font-bold py-4 pl-4 border-b border-grey-600 ">
        Chat{" "}
      </h1>
      <div className="flex-1 overflow-y-auto p-4 h-[calc(70vh-140px)]">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                <div className="chat-header">
                  {message?.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">{message?.text}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center flex-wrap justify-center absolute bottom-0 left-0 right-0 border-t border-grey-600 p-4 gap-2">
        <input
          type="text"
          className="border border-grey-100 p-1.5 outline-0 rounded-md w-[70%]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></input>
        <button
          className="btn btn-primary ml-2 py-1 rounded-sm"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
