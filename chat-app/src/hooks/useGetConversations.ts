import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = (): {
  loading: boolean;
  conversations: any[];
} => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setLoading(true); // Set loading to true when the effect starts
    const fetchData = async () => {
      try {
        const res = await fetch("/users/", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Call the async function directly
  }, []); // Empty dependency array ensures this effect runs only once

  return { loading, conversations };
};

export default useGetConversations;
