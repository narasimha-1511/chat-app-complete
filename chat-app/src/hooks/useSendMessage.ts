import React from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = (): {
  loading: boolean;
  sendMessage: (message: string) => Promise<void>;
} => {
  const [loading, setLoading] = React.useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data.message]);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return {
    sendMessage,
    loading,
  };
};

export default useSendMessage;
