

import React, { useRef, useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {
  const containerRef = useRef(null)

  const { selectedChat, theme } = useAppContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [prompt, setPrompt] = useState(" ")
  const [mode, setMode] = useState("text")
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      }) 
    }
  }, [messages])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Messages */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full mt-20 gap-4 text-gray-500 dark:text-gray-400'>
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt="chatbot"
              className='w-full max-w-56 sm:max-w-68'
            />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* THREE DOTS LOADING */}
        {loading && (
          <div className='loader flex items-center gap-1.5 my-4'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce200'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce400'></div>
          </div>
        )}

      </div>
      {mode == 'image' && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community</p>
          <input
            type="checkbox"
            className='cursor-pointer'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            />
        </label>

      )}

      {/* Input Box */}
      <form onSubmit={onSubmit} className="flex items-center gap-3 border p-2 rounded-lg">
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className='text-sm pl-3 pr-2 outline-none'
        >
          <option className='dark:bg-purple-900' value="text">Text</option>
          <option className='dark:bg-purple-900' value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Start your prompt here..."
          className="flex-1 w-full text-sm outline-none"
          required
        />

        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="send"
            className="w-5 mr-2 hover:invert dark:hover:invert-0 cursor-pointer"
          />
        </button>
      </form>

    </div>
  )
}

export default ChatBox
