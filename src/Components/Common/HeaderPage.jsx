import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const HeaderPage = () => {
  return (
    <>
      <nav className="flex items-center justify-between  bg-gray-900 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">Tu empleado Perfecto</Link>
          </span>
        </div> 
        <div className="w-full block lg:flex lg:items-center lg:w-auto"> 
          <div>
            <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 mr-5">
              <Link to="/CompaniesList"> Empresas</Link></span>
            <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0">
              <Link to="/EmployeesList"> Empleados</Link></span>
          </div>
        </div>
      </nav>

      <Outlet/>
    </>
  )
}

export default HeaderPage