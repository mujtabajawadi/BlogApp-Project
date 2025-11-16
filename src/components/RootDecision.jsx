import React from 'react'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Welcome from '../pages/Welcome'


const RootDecision = () => {
 const authStatus = useSelector((state)=> state.status)

    if (authStatus) {
        return <Home/>
    } else {
        return <Welcome/>
    }
}

export default RootDecision
