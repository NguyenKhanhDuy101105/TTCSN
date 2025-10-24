import React from 'react'
import { Link } from "react-router-dom";
import pc1 from "../assets/images/sc/sc1.png"
import pc2 from "../assets/images/sc/sc2.png"
import pcnen from "../assets/images/sc/scnen.png"
const Service = () => {
    return (
        <div className='max-w-[1300px] mx-auto pt-5 px-5 lg:px-0'>
            <h2 className='text-[24px] font-semibold mt-5'>Dịch vụ toàn diện</h2>
            <ul className='w-full flex justify-between gap-12 my-10'>
                <Link to="/chuyenkhoa" style={{ backgroundImage: `url(${pcnen})` }}
                    className='flex w-1/2 items-center rounded-3xl 
                    border border-gray-200 box-border py-6 px-8
                    bg-cover bg-center relative'>
                    <img src={pc1} alt="" className='size-[56px]' />
                    <h3 className='text-[24px] font-semibold flex-1 pl-15'>Khám Chuyên Khoa</h3>
                    <span className='size-[70px] bg-yellow-500 rounded-[50%] opacity-10 absolute top-1/2 -translate-y-1/2 left-6'></span>
                </Link>
                <Link to="/khamtuxa" style={{ backgroundImage: `url(${pcnen})` }}
                    className='flex w-1/2 items-center rounded-3xl 
                    border border-gray-200 box-border py-6 px-8
                    bg-cover bg-center relative'>
                    <img src={pc2} alt="" className='size-[56px]' />
                    <h3 className='text-[24px] font-semibold flex-1 pl-15'>Khám từ xa</h3>
                    <span className='size-[70px] bg-yellow-500 rounded-[50%] opacity-10 absolute top-1/2 -translate-y-1/2 left-6'></span>
                </Link>
            </ul>
        </div>
    )
}

export default Service
