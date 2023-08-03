import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import { selectChatId } from '../redux/Chats/chatSlice';
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from '../firebase';


const db = getFirestore(app);

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    };

    chatId && getMessages();
  }, [chatId]);


  return (
    <div className='flex flex-col bg-[#deddf1] p-5 h-[calc(100%-128px)] overflow-y-auto scroll'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
