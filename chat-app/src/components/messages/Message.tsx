// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";
import React from "react";

const Message = ({ message: { message, shouldShake } }) => {
  //   const { authUser } = useAuthContext();
  //   const { selectedConversation } = useConversation();
  //   const fromMe = message.senderId === authUser._id;
  //   const formattedTime = extractTime(message.createdAt);
  //   const chatClassName = fromMe ? "chat-end" : "chat-start";
  //   const profilePic = fromMe
  // ? authUser.profilePic
  // : selectedConversation?.profilePic;
  //   const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  const chatClassName = "chat-start";
  const profilePic = "https://i.pravatar.cc/300";
  const bubbleBgColor = "bg-blue-500";
  const formattedTime = "12:00 PM";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

const Messageb = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={"https://i.pravatar.cc/300"}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>hi bitch!</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:42
      </div>
    </div>
  );
};

export default Messageb;
