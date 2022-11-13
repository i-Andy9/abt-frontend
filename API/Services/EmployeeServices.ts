export const GetServiceLisEmployee = async () : Promise<[]> => {
    try {
        const url = `http://localhost:4000/api/employees`
        const resp = await fetch(url)
        const data = await resp.json()
        const List = data.listEmployees
        return List
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteServiceEmployee = async (id: string) : Promise<{}> =>{
    try {
    const url = `http://localhost:4000/api/employees/${id}`
    const resp = await fetch(url ,{
        method: 'DELETE'})
    const data = await resp.json()
    console.log(data)
     return data
     } catch (error) {
        throw new Error(error.message)
    }
}

export const addServiceEmployee = async (body:{}) =>{ 
    try {
    const  url = `http://localhost:4000/api/employees`
    const resp = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: JSON.stringify(body)
    })
    const data = await resp.json()
    console.log(data);
    } catch (error) {
        throw new Error(error.message)
    }
}
export const editServiceEmployee = async (body:{},id: string) =>{ 
    try {
    const  url = `http://localhost:4000/api/employees/${id}`
    const resp = await fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify(body)
    })
    const data = await resp.json()
    console.log(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

 