import React from 'react'

const LandingPage = () => {
  return (
    <div className=" grid grid-cols-3 gap-3  px-20 text-white mt-10 " >      
      <div className="col-span-1  mt-20 mx-10 ">
          <h1 className='text-center mb-10'>Quienes somos </h1>
          <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quidem, tenetur quia voluptatem id inventore atque velit. Repellat rem fugiat molestias dicta facilis similique, dolorem doloribus perspiciatis fuga labore reprehenderit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid magnam voluptatum praesentium, eveniet sint molestias beatae amet libero corporis saepe eum quos accusantium deleniti? Ab debitis eius quidem aperiam enim.
          </span>
      </div>
       <div className="col-span-2 mt-10 flex justify-center"> 
        <img className="rounded-3xl" width={1000} alt='quienes somos' src='https://s7ap1.scene7.com/is/image/TCSCOMprod/What-we-do-1?wid=666&hei=375&dpr=off'/>
      </div> 
    </div>
  )
}

export default LandingPage