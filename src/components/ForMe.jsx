import React from 'react'
import pc1 from "../assets/images/forme/fm1.png"
import pc2 from "../assets/images/forme/fm2.png"
import pc3 from "../assets/images/forme/fm3.png"
import { Link } from 'react-router-dom'
const ForMe = () => {
    return (
        <div className='max-w-[1300px] mx-auto  pt-5 px-5 lg:px-0'>
            <h2 className='text-[24px] font-semibold mb-6'>Dành cho bạn</h2>
            <ul className='flex gap-20'>
                <Link to="" className='text-center cursor-pointer'>
                    <img src={pc1} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Bác sĩ</h3>
                </Link>
                <Link to="" className='text-center cursor-pointer'>
                    <img src={pc2} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Chuyên khoa</h3>
                </Link>
                <Link to="" className='text-center cursor-pointer'>
                    <img src={pc3} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Cơ sở y tế</h3>
                </Link>
            </ul>
        </div>
    )
}

export default ForMe
