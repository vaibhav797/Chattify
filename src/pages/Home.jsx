import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-indigo-200">
      <div className="flex h-4/5 w-full min-[830px]:w-11/12 min-[1250px]:w-4/6 lg:w-5/6 max-[580px]:h-full rounded-lg bg-slate-700 gap-[1.5px] shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
