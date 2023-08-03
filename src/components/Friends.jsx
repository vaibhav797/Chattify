import React, { useEffect, useState } from "react";
import me from "../images/me.jpg";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSlice";
import { changeChat, removeSelectedChat } from "../redux/Chats/chatSlice";

const db = getFirestore(app);

const Friends = () => {
  const [chats, setChats] = useState([]);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleChats = (user) => {
    dispatch(changeChat(user));
  };


  const handleKey = (e) => {
    if (e.code === "Escape") {
      dispatch(removeSelectedChat());
    }
  };

  const getHeight = () => {
    const arr = Array.from(document.querySelectorAll(".box"));

    const h = arr.reduce((tot, cur) => tot + cur.offsetHeight, 0);
    return h;
  };

  return (
    <div className={`h-[calc(100%-97px)] overflow-y-auto scroll`}>
      {chats &&
        Object?.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          ?.map((user) => (
            <button
              key={user[0]}
              onClick={() => {
                const { displayName, photoURL, uid } = user[1].userInfo;
                handleChats({ displayName, photoURL, uid });
              }}
              onKeyUp={(e) => handleKey(e)}
              className="flex items-center cursor-pointer p-2 w-full text-start gap-2 text-white hover:bg-[#2f2d55]"
            >
              <img
                src={user[1].userInfo.photoURL}
                alt=""
                className="h-12 w-12 rounded-[50%] object-cover"
              />
              <div>
                <span className=" font-semibold text-base">
                  {user[1].userInfo.displayName}
                </span>
                <p className=" hidden md:block font-light text-sm text-gray-200">
                  {user[1]?.lastMessage?.text}
                </p>
              </div>
            </button>
          ))}
          
    </div>
  );
};

export default Friends;
