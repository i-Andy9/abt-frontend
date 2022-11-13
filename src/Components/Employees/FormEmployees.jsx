import React, { useEffect, useState } from 'react'
import { addServiceEmployee, editServiceEmployee } from '../../../API/Services/EmployeeServices'
import { formatRut } from '../../Utils/functions'
import { errorAlert, successAlert } from '../Alerts/Alerts'

const FormEmployees = ({
    handleListEmployees,
    setListEmployees,
    odtFormEditEmployee,
    setodtFormEditEmployee,
    editModeEmployee,
    seteditModeEmployee,
    listCompanies
}) => {
    const [validator, setValidator] = useState(false)
    const [formEmployee, setFormEmployee] = useState({
        nombre: '',
        rut: '',
        direccion: '',
        telefono: '',
        empresa: ''
    })

    const handleUpdateODT = (e) => {
        const { value, id } = e.target

        switch (id) {
            case 'name':
                setFormEmployee({ ...formEmployee, nombre: value })
                break;
            case 'rut':
                setFormEmployee({ ...formEmployee, rut: formatRut(value) })
                break;
            case 'address':
                setFormEmployee({ ...formEmployee, direccion: value })
                break;
            case 'phone':
                if (value <= 999999999) {
                    setFormEmployee({ ...formEmployee, telefono: (value) })
                }
                break;
            case 'company':
                setFormEmployee({ ...formEmployee, empresa: value })
                break;

            default:
                setFormEmployee({ ...formEmployee })
                break;
        }
    }

    const submitForm = async () => {

        if (!editModeEmployee) {
            await addServiceEmployee(formEmployee)
            successAlert('Registro realizado correctamente' )
        } else {
            await editServiceEmployee(formEmployee, formEmployee.rut)
            successAlert('Registro actualizado correctamente' )
            seteditModeEmployee(false)
        } 
        cleanForm()
        handleListEmployees()
        setodtFormEditEmployee({})
    }

    const cleanForm = () => {
        setFormEmployee({
            nombre: '',
            rut: '',
            direccion: '',
            telefono: '',
            empresa: '',
        })
    }

    const validateForm = () => {
        const { nombre, rut, direccion, telefono, empresa } = formEmployee
        if (nombre === '' || nombre.length < 3 ||
            rut === '' || rut.length < 9 ||
            direccion === '' || direccion.length < 6 ||
            telefono < 0 ||
            empresa === ''
        ) { 
            console.log("estan vacios")
            setValidator(true)
            return true
        }
        console.log("ok")
        setValidator(false)
        return false
    }

    useEffect(() => {
        if (editModeEmployee) {
            return setFormEmployee({
                ...FormEmployees,
                nombre: odtFormEditEmployee.nombre,
                rut: formatRut(odtFormEditEmployee.rut),
                direccion: odtFormEditEmployee.direccion,
                telefono: odtFormEditEmployee.telefono,
                empresa: odtFormEditEmployee.empresa,
            })
        }
        cleanForm()
    }, [editModeEmployee, odtFormEditEmployee])

    useEffect(() => {
        validateForm()
    }, [formEmployee])
    return (
        <>
            <div className="bg-gray-700 py-2 rounded-md mx-10 my-3 text-center">
                <h1 className="text-center mb-3">Formulario de registro de Empleados</h1>

                <div className="text-xs">
                    <label className="block py-2 pl-1">Nombre</label>
                    <input
                        required
                        id='name'
                        onChange={handleUpdateODT}
                        type="text"
                        value={formEmployee.nombre}
                        maxLength={25}
                        placeholder='Juanito Vera'
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">RUT</label>
                    <input
                        required
                        id='rut'
                        disabled={editModeEmployee}
                        onChange={handleUpdateODT}
                        value={formEmployee.rut}
                        type="text"
                        placeholder='99.999.999-3'
                        minLength="9"
                        maxLength="12"
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">Direccion</label>
                    <input
                        required
                        id='address'
                        onChange={handleUpdateODT}
                        value={formEmployee.direccion}
                        type="text"
                        maxLength="35"
                        placeholder='Ohiggins 318, Melipilla'
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">Telefono</label>
                    <input
                        required
                        id='phone'
                        onChange={handleUpdateODT}
                        value={formEmployee.telefono}
                        type="number"
                        minLength="9"
                        maxLength='9'
                        max={9999999}
                        placeholder='982736472'
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">Empresa</label>
                    <select
                        id='company'
                        onChange={handleUpdateODT}
                        value={formEmployee.empresa}
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' >
                        <option key={0} value={''} disabled>
                            Seleccione
                        </option>
                        {listCompanies.length > 0 && listCompanies.map((c, i) => (
                            <option key={i + 1} value={c.rut}>
                                {c.nombre}
                            </option>
                        ))

                        }
                    </select>
                </div>
                <div>
                    <button
                        className={validator ?
                            "opacity-40 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-3 "
                            : " inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-3 "}
                        onClick={() => validateForm() ? null : submitForm()}
                        disabled={validator}
                    >{editModeEmployee ? "Actualizar" : "Registrar"}</button>
                </div>
            </div>
        </>
    )
}

export default FormEmployees