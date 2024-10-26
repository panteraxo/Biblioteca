import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify, Apple } from 'lucide-react'
import { Link } from 'react-router-dom'
function MobileNav() {
  return (
    <div className='md:hidden'>
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side='left'>
          <Link to="/">
            <Apple className='text-red-500'/>
          </Link>
          <nav className='flex flex-col gap-3 lg:gap-4 mt-6'>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/mantenimiento">Mantenimiento</Link>
            <Link to="/prestamos">Prestamos</Link>
            <Link to="/usuarios">Usuarios</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav