import React, { useEffect, useRef, useState } from "react";
import me from "../images/me.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSlice";
import { selectedUser } from "../redux/Chats/chatSlice";

const Message = ({message}) => {
  const currentUser = useSelector(selectUser);
  const user = useSelector(selectedUser)

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: 'smooth'});
  },[message]);


  return (
    <div ref={ref} className={`flex gap-3 mb-3 ${message.senderId === currentUser.uid && "flex-row-reverse"}`}>
      <div className="flex flex-col text-gray-400">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : user.photoURL} alt="" className="h-10 w-10 rounded-[50%] object-cover" />
        <span className="text-xs w-full">Just Now</span>
      </div>
      <div className={`flex flex-col gap-3 ${message.senderId === currentUser.uid && 'items-end'}`}>
        {message.text !== "" && <p
          className={`w-max p-3 ${
            message.senderId === currentUser.uid
              ? "bg-[#9ba4fb] text-white rounded-l-[10px] rounded-br-[10px]"
              : "rounded-r-[10px] rounded-bl-[10px] items-start bg-white"
          }`}
        >
          {message.text}
        </p>}
        {message.img && <img src={message.img} className="h-full w-10/12 object-cover" alt="" />}
      </div>
    </div>
  );
};

export default Message;
