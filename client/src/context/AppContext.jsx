import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../data/dummyData";

const AppContext=createContext();

export const AppContextProvider=({children})=>{

    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [chats,setChats]=useState([]);
    const [selectedChat,setSelectedChat]=useState(null);
    const [theme,setTheme]=useState(localStorage.getItem("theme")||"light");

    const fetchUser=async()=>{
        // console.log('Fetching user...')
        // setUser(dummyUserData);
        // console.log('User set:', dummyUserData)
        setUser();
    }

    const fetchUsersChats=async()=>{
        console.log('Fetching chats...')
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
        console.log('Chats set:', dummyChats)
        console.log('Selected chat set:', dummyChats[0])
    }

    useEffect(()=>{
        if(theme==="dark"){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }  
        localStorage.setItem("theme",theme);
    },[theme]);
    
        
    useEffect(()=>{
        if(user){
            fetchUsersChats();
        }else{
            setChats([]);
            setSelectedChat(null);

        }
    },[user]);



                
    useEffect(()=>{
        fetchUser();
    },[]);
    const value={
        navigate,user,setUser,chats,setChats,selectedChat,setSelectedChat,theme,setTheme
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}
export const useAppContext=()=>useContext(AppContext)
