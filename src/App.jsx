import { useEffect, useState } from 'react' 
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { GetServiceLisCompanies } from '../API/Services/CompaniesServices'
import { GetServiceLisEmployee } from '../API/Services/EmployeeServices'
import HeaderPage from './Components/Common/HeaderPage'
import LandingPage from './Components/Common/LandingPage'
import CompaniesList from './Components/Companies/CompaniesList' 
import EmployeesList from './Components/Employees/EmployeesList'
 

function App() { 

  const [listEmployees, setListEmployees] = useState([])
  const [listCompanies, setListCompanies] = useState([])
  const [editModeCompany, seteditModeCompany] = useState(false)
  const [editModeEmployee, seteditModeEmployee] = useState(false)


  const handleListCompanies = async () => {
    let arrList = await GetServiceLisCompanies()
    setListCompanies( arrList)
  }
  const handleListEmployees = async () => {
    let arrList = await GetServiceLisEmployee() 
    setListEmployees( arrList)
}

  useEffect(() => { 
    handleListEmployees()
    handleListCompanies()  
  }, [])
  return (
 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderPage/>}>
            <Route index element={<LandingPage/>}/>  
            <Route path='CompaniesList' element={
              <CompaniesList 
                handleListCompanies={handleListCompanies} 
                listCompanies={listCompanies} 
                setListCompanies={setListCompanies} 
                editModeCompany={editModeCompany}
                seteditModeCompany={seteditModeCompany}
                listEmployees={listEmployees}
              />}
            />
            <Route path='EmployeesList' element={
              <EmployeesList 
                handleListEmployees={handleListEmployees}
                listEmployees={listEmployees} 
                setListEmployees={setListEmployees} 
                listCompanies={listCompanies}  
                editModeEmployee={editModeEmployee}
                seteditModeEmployee={seteditModeEmployee}
              />}
            />
          </Route>
        </Routes>
      </BrowserRouter> 
  )
}

export default App
