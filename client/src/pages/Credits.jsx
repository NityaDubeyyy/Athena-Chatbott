import React from 'react'
import Loading from './Loading';
import { useEffect, useState } from 'react';
import { dummyPlans } from '../data/dummyData';
import { useAppContext } from '../context/AppContext';

const Credits = () => {
  const[plans,setPlans]=useState([]);
  const[loading,setLoading]=useState(true);
  const {token,axios} = useAppContext()

  const fetchPlans=async()=>{
    try{
      const {data} = await axios.get('/api/credit/plan', {
        headers: {Authorization : token}

      })
      if (data.success){
        setPlans(data.plans)
      }else{
        toast.error(data.message || 'Failed to fetch plans')
      }

    }catch(error){
      toast.error(error.message)

    }
    setLoading(false)
  }
  ///for purchaisng pro plans etc
  const PurchasePlan = async(planId)=>{
    try{
      const {data} = await axios.post('/api/credit/purchase', {planId},{headers:{Authorization: token }})
      if (data.success){
        window.location.href = data.url
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }

  }
  useEffect(()=>{
    fetchPlans();
  },[]);
  if (loading) return <Loading/>



  return (
    <div>
      <div className='max-w-7xl h-scrren overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>
        <div className='flex flex-wrap justify-center gap-6'>
          {plans.map((plan)=>(
            <div key={plan.id} className={'border border-gray-300 dark:border-gray-700 rounded-lg p-6 w-72 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id==="pro" ? "bg-purple-50 dark:bg-purple-900": "bg-white dar:bg-transparent"}' }>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-white'>{plan.name}</h3>
                <p>${plan.price}
                  <span className='text-base font-normal text-gray-600 dark:text-purple-200'>{' '}/{plan.credits} credits</span>
                </p>
                <ul className='list-disc list-inside text-sm text-gray-700 dark:text-purple-200 space-y-1' >
                    {plan.features.map((feature,index)=>(
                    <li key={index} className='text-gray-600 dark:text-gray-300 mt-2'>- {feature}</li>
                  ))}
                </ul>
              </div>
              <button onClick={()=>toast.promise(purchasePlan(plan._id), {loading: 'processing...'})} className='mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors'>Buy Now</button>

              </div>
          ))}
      </div>
    </div>
    </div>
  )
}


export default Credits
