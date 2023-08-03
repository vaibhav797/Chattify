import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-indigo-200">
      <div className="flex h-4/5 w-4/6 border-2 rounded-lg bg-slate-700 border-white gap-[1.5px] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
