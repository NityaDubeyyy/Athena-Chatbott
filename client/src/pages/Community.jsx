import React from 'react'
import { useState,useEffect } from 'react'
import Loading from './Loading'

const Community = () => {
  const [images,setImages]=useState([]);
  const[loading,setLoading]=useState(true);
  const fetchImages=async()=>{
    setLoading(false);
  }
  useEffect(()=>{
    fetchImages();
  },[]);

  if (loading) return <Loading/>
   


  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <h2 className='text-xl font-semibold mb-6 text-gray-800 dar:text-purple-100'>Community Images</h2>
      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((image, index) => (
            <a key={index} href={item.imageUrl} target='_blank' className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duartion-300'>
              <img
                src={item.imageUrl} 
                alt=""
                className='w-full h-40 md:h-50 2xl:h-62 object-cover group:hover:scale-105 transition-transform duration-300 ease-in-out'/>
                <p className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Created by {item.userName}</p>


            </a>
          ))}
          </div>  
      ) : (
        <p className='text-center text-gray-600 dark:text-purple-400 mt-10'>No community images available.</p>

      )
        }

      
    </div>
  )
}

export default Community
