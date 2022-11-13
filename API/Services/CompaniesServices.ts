export const GetServiceLisCompanies = async () : Promise<[]> => {
    const url = `http://localhost:4000/api/Companies`
    const resp = await fetch(url)
    const data = await resp.json()
    const List = data.listCompanies
    return List
}
export const deleteServiceCompany = async (id: string) : Promise<{}> =>{
    const url = `http://localhost:4000/api/Companies/${id}`
    const resp = await fetch(url ,{
        method: 'DELETE'})
    const data = await resp.json()
    console.log(data)
     return data
}

export const addServiceCompany = async (body:{}) =>{ 
    try {
    const  url = `http://localhost:4000/api/Companies`
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

export const editServiceCompany = async (body:{},id: string) =>{ 
    try {
    const  url = `http://localhost:4000/api/Companies/${id}`
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