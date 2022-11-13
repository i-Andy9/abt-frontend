import React, { useEffect, useState } from 'react'
import { addServiceCompany, editServiceCompany } from '../../../API/Services/CompaniesServices'
import { formatRut } from '../../Utils/functions.js'
import { successAlert } from '../Alerts/Alerts'

const FormCompanies = ({ 
    setListCompanies, 
    handleListCompanies,
    editModeCompany,
    seteditModeCompany,
    odtFormEditCompany,
    setodtFormEditCompany,
}) => {
    const [validator, setValidator] = useState(true)
    const [formCompany, setFormCompany] = useState({
        nombre: '',
        rut: '',
        mail: ''
    })

    const handleUpdateODT = (e) => {
        const { value, id } = e.target

        switch (id) {
            case 'name':
                setFormCompany({ ...formCompany, nombre: value })
                break;
            case 'rut':
                console.log(formatRut(value));
                setFormCompany({ ...formCompany, rut: formatRut(value) })
                break;
            case 'mail':
                setFormCompany({ ...formCompany, mail: value })
                break;

            default:
                setFormCompany({ ...formCompany })
                break;
        }
    }

    const submitForm = async () => {

        if (!editModeCompany) {
            await addServiceCompany(formCompany)
            successAlert('Registro realizado correctamente' )
        } else {
            await editServiceCompany(formCompany, formCompany.rut)
            successAlert('Registro actualizado correctamente' )
            seteditModeCompany(false)
        } 
        cleanForm()
        handleListCompanies()
        setodtFormEditCompany({})
    }

    const cleanForm = () => {
        setFormCompany({
            nombre: '',
            rut: '',
            mail: '',
        })
    }
    const validateForm = () => {
        const { nombre, rut, mail } = formCompany
        if (nombre === '' || nombre.length < 4 ||
            rut === '' || rut.length < 9 ||
            mail === ''
        ) {

            console.log("estan vacios")
            setValidator(true)
            return true
        }
        console.log("ok")
        setValidator(false)
        return false
    }

    useEffect(()=>{
        if(editModeCompany){
            return setFormCompany({
                ...formCompany, 
                nombre:odtFormEditCompany.nombre,
                rut:formatRut(odtFormEditCompany.rut),
                mail:odtFormEditCompany.mail,
            })
        }
    },[editModeCompany,odtFormEditCompany])

    useEffect(()=>{
        validateForm()
    },[formCompany])
    return (
        <>
            <div className="bg-gray-700 py-2 rounded-md mx-10 my-3 text-center">
                <h1 className="text-center mb-3">Formulario de registro de Empresas</h1>

                <div className="text-xs">
                    <label className="block py-2 pl-1">Nombre</label>
                    <input
                        required
                        id='name'
                        onChange={handleUpdateODT}
                        value={formCompany.nombre}
                        type="text" placeholder=' Vera y Asociados'
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">rut</label>
                    <input
                        required
                        id='rut'
                        disabled={editModeCompany}
                        onChange={handleUpdateODT}
                        value={formCompany.rut}
                        type="text"
                        placeholder='99.999.999-3'
                        minLength="9"
                        maxLength="12"
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div className="text-xs">
                    <label className="block py-2 pl-1">mail</label>
                    <input
                        required
                        id='mail'
                        onChange={handleUpdateODT}
                        value={formCompany.mail}
                        type="mail"
                        placeholder='ceo@amazon.com'
                        className='outline-none text-black  w-80 px-2 py-1 mx-2 rounded-md' />
                </div>
                <div>
                    <button
                        className={validator ?
                            "opacity-40 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-3 "
                            : " inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-3 "}
                        onClick={() => validateForm() ? null : submitForm()}
                    > {editModeCompany? "Actualizar" :"Registrar"}</button>
                </div>
            </div>

        </>
    )
}

export default FormCompanies