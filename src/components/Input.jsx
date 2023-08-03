import React, { useState } from "react";
import Attach from "../images/attach.png";
import Image from "../images/image.png";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSlice";
import { selectChatId, selectedUser } from "../redux/Chats/chatSlice";
import { Timestamp, arrayUnion, doc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { app } from "../firebase";
import {v4 as uuid} from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

const Input = () => {
  const [texting,setText] = useState("");
  const [Img,setImg] = useState(null);
  const currentUser = useSelector(selectUser);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectedUser);

  const handleKey = (e) => {
    if(e.code === 'Enter')
    {
      handleSend();
    }
  } 


  const handleSend = async ()=> {
    const text = texting;
    setText("")
    if(Img)
    {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, Img).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db,'chats',chatId),{
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          })
        });
      })

    }else
    {
      await updateDoc(doc(db,'chats',chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setImg(null);
  }



  return (
    <div className="bg-white h-16 py-4 px-2 gap-1 rounded-br-lg flex justify-between">
      <input
        type="text"
        value={texting}
        onChange={e=>setText(e.target.value)}
        onKeyUp={e=>handleKey(e)}
        className=" w-5/6 outline-none"
        placeholder="Type something..."
      />
      <div className="flex gap-2 items-center">
        <img src={Attach} alt="" className="cursor-pointer" />
        <input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])} className="hidden" id="file" />
        <label htmlFor="file" className="cursor-pointer w-12 md:w-10">
          <img src={Image} className=" object-cover" alt="" />
        </label>
        <button onClick={handleSend} className="bg-[#9ba4fb] text-white px-3 py-2">Send</button>
      </div>
    </div>
  );
};

export default Input;
