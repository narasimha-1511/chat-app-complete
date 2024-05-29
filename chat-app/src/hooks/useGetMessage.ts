import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessage = (): {
  loading: boolean;
  messages: any[];
} => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/messages/get/${selectedConversation._id}`
        );

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return {
    messages,
    loading,
  };
};

export default useGetMessage;
