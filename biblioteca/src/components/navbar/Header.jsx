import React from 'react'
import { Link } from 'react-router-dom'
import MainNav from './Main-nav'
import MobileNav from './Mobile-nav'



function Header() {
  return (
    <header className='sticky top-0 w-full border-b'>
        <div className='h-14 mx-6 flex items-center'>
           <MainNav />
           <MobileNav />
            <h1 className='flex justify-end flex-1'>
                <Link to="/">login</Link>
            </h1>
        </div>
    </header>
  )
}

export default Header