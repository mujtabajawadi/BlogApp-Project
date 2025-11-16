import React from 'react'
import {Header, Footer} from './index'
import { Outlet } from 'react-router-dom'

const HeaderFooterLayout = () => {
    
    return (
      <div className="h-screen w-screen overflow-x-hidden flex flex-col flex-wrap content-between">
        <div className="w-full  flex-1 flex flex-col">
          <Header />
          <main className="flex-1 min-w-dvw">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) 
}

export default HeaderFooterLayout
