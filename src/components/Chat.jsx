import React from 'react'
import video from '../images/video.png'
import dots from '../images/dots.png'
import Input from './Input'
import Messages from './Messages'
import { useSelector } from 'react-redux'
import {  selectChatId, selectedUser } from '../redux/Chats/chatSlice'
import StartChat from './StartChat'

const Chat = () => {
  const user = useSelector(selectedUser);
  const chatId = useSelector(selectChatId);

  return chatId ? (
    <div className='flex-[2_1_0%]'>
      <div className='bg-[#4b4986] h-16 p-4 rounded-tr-lg flex text-[#E2E8F0] font-semibold text-lg items-center justify-between'>
        <span>{user?.displayName}</span>
        <div className='flex items-center gap-7'>
          <img src={video} alt="" className='cursor-pointer' />
          <img src={dots} alt="" className='cursor-pointer' />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  ) : <StartChat/>
}

export default Chat
