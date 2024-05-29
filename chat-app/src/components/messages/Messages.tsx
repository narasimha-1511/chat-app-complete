import Message from "./Message";
import React, { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "./../skeletons/MessageSkeleton";

const Messages = () => {
  const { loading, messages } = useGetMessage();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  //make the message stype safe
  const Safemessages = Array.from(messages);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 ? (
        <p className="text-center">No messages yet , Start the Conversation</p>
      ) : (
        Safemessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message key={message._id} message={message} />
          </div>
        ))
      )}
    </div>
  );
};
export default Messages;
