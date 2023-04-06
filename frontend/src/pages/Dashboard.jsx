import React, { useEffect } from 'react'
import {userEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import goalForm from '../components/goalForm'
function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user,navigate])
  
  
  return <>
    <section className="heading">
    <h1>Welcome {user && user.name}</h1>
    <p>Goals DashBoard</p>
    </section>

    <goalForm/>
  </>
   
  
}

export default Dashboard