import React from "react";

const StartChat = () => {
  return (
    <div className="flex-[2_1_0%]">
      <div className="flex gap-5 flex-col items-center justify-center flex-wrap rounded-r-lg bg-[#e8e8f9] p-5 h-[calc(100%)] overflow-y-auto">
        <h1 className=" text-4xl text-slate-500 font-extrabold">Chattify</h1>
        <p className="text-slate-400 text-xl font-semibold">Select a chat to start a conversation</p>
      </div>
    </div>
  );
};

export default StartChat;
