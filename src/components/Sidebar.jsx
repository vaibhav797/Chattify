import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Friends from "./Friends";

const Sidebar = () => {
  return (
    <div className="flex-[1_1_0%] overflow-y-auto no-scrollbar h-full bg-[#3c3a70] rounded-l-lg ">
      <Navbar />
      <Search />
      <Friends />
    </div>
  );
};

export default Sidebar;
