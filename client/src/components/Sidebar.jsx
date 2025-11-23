
// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import moment from "moment";
// import toast from "react-hot-toast";

// const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
//   const { chats, setSelectedChat, theme, setTheme, user, navigate , createNewChat, axios, setChats, fetchUsersChats, setToken} =
//     useAppContext();

//   const [search, setSearch] = useState("");

//   const logout = () = {
//     localStorage.removeItem('token')
//     setToken(null);
//     toast.success('Logged out successfully!')
    

//   }
//   const deleteChat = async(e,chatId)=>{
//     try{
//       e.stopPropagation();
//       const confirm = window.confirm('Are you sure you want to delete this chat?')
//       if(!confirm) return
//       const {data} = await axios.post('/api/chat/delete', {chatId} , {
//         headers:{Authorization: token}})
//         if(data.success){
//           setChats(prev => prev.filter(chat=> chat._id!== chatId))
//           await fetchUsersChats()
//           toast.success(data.message)
//         }
      
//     }
//     catch(error){
//       toast.error(error.message)

//     }
      
//     }
//   }


//   return (
//     <div
//       className={`flex flex-col h-screen min-w-72 p-5 
//       dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
//       border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 
//       max-md:absolute left-0 z-10 
//       ${!isMenuOpen && "max-md:-translate-x-full"}`}
//     >
//       {/* LOGO */}
//       <img
//         src={theme === "dark" ? assets.logo_full_dark : assets.logo_full}
//         alt="Logo"
//         className="w-full max-w-48"
//       />

//       {/* New Chat */}
//       <button onClick={createNewChat} className="mt-4 flex items-center text-sm font-medium px-3 py-2 border border-gray-400 dark:border-white/20 rounded-md hover:bg-white/10 transition-all">
//         <span className="mr-2 text-xl">+</span> New Chat
//       </button>

//       {/* Search */}
//       <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
//         <img src={assets.search_icon} className="w-4 dark:invert" alt="search" />
//         <input
//           type="text"
//           placeholder="Search conversations..."
//           className="bg-transparent outline-none w-full placeholder:text-sm placeholder:text-gray-500 dark:placeholder:text-gray-300"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Recent Chats */}
//       {chats.length > 0 && (
//         <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
//           Recent Chats
//         </p>
//       )}

//       <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
//         {chats
//           .filter((chat) =>
//             chat.messages.length > 0
//               ? chat.messages[0]?.content
//                   .toLowerCase()
//                   .includes(search.toLowerCase())
//               : chat.name.toLowerCase().includes(search.toLowerCase())
//           )
//           .map((chat) => (
//             <div
//               key={chat._id}
//               onClick={() => {
//                 navigate("/");
//                 setSelectedChat(chat);
//                 setIsMenuOpen(false);
//               }}
//               className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center group hover:bg-gray-100 dark:hover:bg-[#57317C]/20 transition-all"
//             >
//               <div className="flex flex-col">
//                 <p className="truncate w-40">
//                   {chat.messages.length > 0
//                     ? chat.messages[0]?.content.slice(0, 32)
//                     : chat.name}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
//                   {moment(chat.updatedAt).fromNow()}
//                 </p>
//               </div>
//               <img
//                 src={assets.bin_icon}
//                 className="hidden group-hover:block w-4 cursor-pointer dark:invert"
//                 alt="delete chat" onClick={e=>toast.promise(deleteChat(e, chat._id),{loading: 'deleting...'})}
//               />
//             </div>
//           ))}
//       </div>

//       {/* Community */}
//       <div
//         onClick={() => {
//           navigate("/community");
//           setIsMenuOpen(false);
//         }}
//         className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
//       >
//         <img src={assets.gallery_icon} className="w-5 dark:invert" alt="" />
//         <p className="text-sm">Community Images</p>
//       </div>

//       {/* Credits */}
//       <div
//         onClick={() => {
//           navigate("/credits");
//           setIsMenuOpen(false);
//         }}
//         className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
//       >
//         <img src={assets.diamond_icon} className="w-5 dark:invert" alt="" />
//         <div className="flex flex-col text-sm">
//           <p>Credits: {user?.credits}</p>
//           <p className="text-xs text-gray-500">
//             Purchase credits to use Athena-AI
//           </p>
//         </div>
//       </div>

//       {/* Dark Mode Toggle */}
//       <div className="flex items-center justify-between gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md">
//         <div className="flex items-center gap-2 text-sm">
//           <img src={assets.theme_icon} className="w-5 dark:invert" alt="" />
//           <p>Dark Mode</p>
//         </div>

//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={theme === "dark"}
//             onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
//           />
//           <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
//           <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform"></span>
//         </label>
//       </div>

//       {/* User */}
//       <div className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md cursor-pointer group">
//         <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
//         <p className="flex-1 text-sm dark:text-primary truncate">
//           {user ? user.name : "Login your Account"}
//         </p>
//         {user && (
//           <img onClick={logout}
//             src={assets.logout_icon}
//             className="h-5 cursor:pointer not-dark:invert group-hover:block"
//             alt="logout"
//           />
//         )}
//       </div>

//       {/* Close Icon */}
//       <img
//         onClick={() => setIsMenuOpen(false)}
//         src={assets.close_icon}
//         className="absolute top-4 right-4 w-6 not-dark:invert md:hidden cursor-pointer"
//         alt="close sidebar"
//       />
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token
  } = useAppContext();

  const [search, setSearch] = useState("");

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully!");
  };

  // DELETE CHAT
  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 
      dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
      border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 
      max-md:absolute left-0 z-10 
      ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full_dark : assets.logo_full}
        alt="logo"
        className="w-full max-w-48"
      />

      {/* Create New Chat */}
      <button
        onClick={createNewChat}
        className="mt-4 flex items-center text-sm font-medium px-3 py-2 border border-gray-400 dark:border-white/20 rounded-md hover:bg-white/10 transition-all"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-4 dark:invert" alt="search" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="bg-transparent outline-none w-full placeholder:text-sm placeholder:text-gray-500 dark:placeholder:text-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Recent Chats
        </p>
      )}

      <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
        {chats
          .filter((chat) =>
            chat.messages.length > 0
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center group hover:bg-gray-100 dark:hover:bg-[#57317C]/20 transition-all"
            >
              <div className="flex flex-col">
                <p className="truncate w-40">
                  {chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer dark:invert"
                alt="delete"
                onClick={(e) =>
                  toast.promise(deleteChat(e, chat._id), {
                    loading: "Deleting...",
                  })
                }
              />
            </div>
          ))}
      </div>

      {/* Community */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.gallery_icon} className="w-5 dark:invert" alt="" />
        <p className="text-sm">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/20 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.diamond_icon} className="w-5 dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Credits: {user?.credits}</p>
          <p className="text-xs text-gray-500">
            Purchase credits to use Athena-AI
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-5 dark:invert" alt="" />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform"></span>
        </label>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 mt-6 p-3 border border-gray-400 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {user ? user.name : "Login your Account"}
        </p>
        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            className="h-5 cursor-pointer not-dark:invert group-hover:block"
            alt="logout"
          />
        )}
      </div>

      {/* Close Sidebar */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-4 right-4 w-6 not-dark:invert md:hidden cursor-pointer"
        alt="close"
      />
    </div>
  );
};

export default Sidebar;
