import { Apple } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function MainNav() {
  return (
    <div className='hidden md:flex'>
      <Link to="/">
        <Apple className="text-red-500"/>
      </Link>
      <nav className='flex items-center gap-3 lg:gap-4 ml-8'>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/mantenimiento">Mantenimiento</Link>
        <Link to="/prestamos">Prestamos</Link>
        <Link to="/usuarios">Usuarios</Link>
      </nav>
    </div>

  )
}

export default MainNav