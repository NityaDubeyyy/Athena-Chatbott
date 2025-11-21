

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import Message from './components/Message';
import { Route, Routes, useLocation } from 'react-router-dom';   
import Credits from './pages/Credits';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Community from './pages/Community';
import { assets } from './assets/assets';
import './assets/prism.css'
import { useAppContext } from './context/AppContext';


console.log('App component rendering...');

const App = () => {

  const {user}=useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();   

  if (pathname === "/loading") return <Loading />

  

  return (
    <>
      {/* Menu Icon for Mobile */}
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-4 left-4 w-6 invert dark:invert-0 md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white h-screen w-screen overflow-hidden">
        <div className="flex h-full w-full">

          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />

              {/* Enable when needed */}
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/loading" element={<Loading />} /> */}
            </Routes>
          </div>
        </div>
      </div>

      ):(
        <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
          <Login/>
        </div>

      )}

      
    </>
  );
};

export default App;
