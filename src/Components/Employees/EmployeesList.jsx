import React, { useEffect } from 'react'
import FormEmployees from './FormEmployees'
import { useState } from 'react';
import { deleteServiceEmployee } from '../../../API/Services/EmployeeServices';
import { formatRut } from '../../Utils/functions';
import { successAlert } from '../Alerts/Alerts';

const EmployeesList = ({ handleListEmployees,listEmployees, setListEmployees, listCompanies, editModeEmployee,seteditModeEmployee }) => {

 
    const [odtFormEditEmployee, setodtFormEditEmployee] = useState({})

    const deleteEmployee = async (rut) => {
        await deleteServiceEmployee(rut)
        successAlert('Registro eliminado correctamente' ) 
        handleListEmployees()
    }
    const editEmployee = async (obj) => {
        if(editModeEmployee){
            setodtFormEditEmployee({})
            console.log(odtFormEditEmployee)
            setodtFormEditEmployee(obj)
            console.log(odtFormEditEmployee)
        }else{
            seteditModeEmployee(!editModeEmployee)
            setodtFormEditEmployee(obj)
        }
    }

    useEffect(() => { 
        handleListEmployees()   
      }, [])  
    
    return (
        <>
            <div className="text-white font-thin bg-slate-800 ">
                <div className="md:flex ">
                    <div className="  basis-1/3 md:shrink-0">
                        <FormEmployees
                            handleListEmployees={handleListEmployees}
                            setListEmployees={setListEmployees}
                            odtFormEditEmployee={odtFormEditEmployee}
                            editModeEmployee={editModeEmployee}
                            seteditModeEmployee={seteditModeEmployee}
                            setodtFormEditEmployee={setodtFormEditEmployee}
                            listCompanies={listCompanies}  
                        />
                    </div>
                    <div className="flex bg-gray-500 py-2 rounded-md mx-10 my-3 basis-2/3">
                        <div className="text-center w-full mb-3">
                            <h1 className="mb-3">Registro de Empleados</h1>
                            <table className="fluid table text-xs w-full text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Rut</th>
                                        <th scope="col">Direccion</th>
                                        <th scope="col">Telefono</th>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        listEmployees.length > 0 ? (
                                            listEmployees.map((e, i) => (
                                                <tr key={e.rut}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{e.nombre}</td>
                                                    <td>{formatRut(e.rut)}</td>
                                                    <td>{e.direccion}</td>
                                                    <td>{e.telefono}</td>
                                                    <td>{listCompanies.length > 0 && listCompanies.find(c=> c.rut === e.empresa).nombre  }</td>
                                                    <td>
                                                        <button
                                                            className= "p-1 hover:bg-slate-800 rounded-lg"
                                                            onClick={() => { editEmployee(e) }}
                                                            type="button"
                                                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                                                        </button>

                                                        <button
                                                            className="p-1 hover:bg-slate-800 rounded-lg "
                                                            onClick={() => { deleteEmployee(e.rut) }}
                                                            type="button"
                                                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr >
                                                <td scope="row" colSpan={7}>No hay datos registrados actualmente</td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeesList