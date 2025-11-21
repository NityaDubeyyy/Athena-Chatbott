import React, { use } from 'react'
import { assets } from '../assets/assets'  
import moment from 'moment'
import Markdown from 'react-markdown'
import prism from 'prismjs'
import { useEffect } from 'react'
const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);
  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-ssm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
          </div>

          {/* USER ICON */}
          <img src={assets.user_icon} className='w-8 h-8 rounded-full' alt="user" />
        </div>
      ) : (
        <div className='inline-flex flex-col gap-2 p-2 px-4 bg-gray-100 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md my-4 max-w-2xl'>
          
          {message.isImage ? (
            <img
              src={message.content}
              className='max-w-md mt-2 w-full rounded-md'
              alt="generated"
            />
          ) : (
            <div className='text-ssm dark:text-primary reset-tw'>
             <Markdown>{message.content}</Markdown></div>
          )}

          <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default Message
