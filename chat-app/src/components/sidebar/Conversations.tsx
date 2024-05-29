import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  //convert the conversations set to an array because this is typescript and it doesn't like sets
  const safeConversations = conversations ? Array.from(conversations) : [];

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {safeConversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          lastIndex={conversations.length - 1 === index}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"> </span>
      ) : null}
    </div>
  );
};
export default Conversations;
