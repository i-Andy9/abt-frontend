import Swal from 'sweetalert2'

export const errorAlert =(title,text)=>{
    return Swal.fire({
        icon: 'error',
        title: `${title}`,
        text: `${text}`,
        /* footer: '<a href="">?</a>' */
      })
}

export const successAlert =(title)=>{
   return  Swal.fire({
         
        icon: 'success',
        title,
        showConfirmButton: false,
        timer: 1500
      })
}