import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:flex-col md:flex-row sm:h-[50vh] md:h-[75vh] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <div className="w-0.5 bg-gray-200"></div>
      <MessageContainer />
    </div>
  );
};

export default Home;
