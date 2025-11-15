import React from 'react'
import { useDispatch } from 'react-redux'
import obj_AutjService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'


const LogoutButton = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        obj_AutjService.logout()
            .then(() => {
            dispatch(logout())
        })
    }



  return (
    <button className="inline-bock px-6 py-2 duration-200 bg-red-700 text-white  hover:scale-110 rounded-full cursor-pointer" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton
