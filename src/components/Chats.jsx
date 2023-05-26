import React, { useContext, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
  
      return () => {
        unsub();
      }
    };

    currentUser.uid && getChats();
    
  }, [currentUser.uid]);
  
  console.log(chats);

  return (
    <div className='chats'>
      {Object.entries(chats)?.map(chat => (
        <div className='user-chat' key={chat[0]}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className='user-chat-info'>
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].userInfo.lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Chats