import React from 'react'
import pc1 from "../assets/images/suggest/goiy1.png"
import pc2 from "../assets/images/suggest/goiy2.png"
import pc3 from "../assets/images/suggest/goiy3.png"

const Suggest = () => {
    return (
        <div className='max-w-[1300px] mx-auto mt-10 pt-5 px-5 lg:px-0'>
            <h2 className='text-[24px] font-semibold mb-6'>Gợi ý của HealthCare</h2>
            <ul className='flex gap-20'>
                <li className='text-center'>
                    <img src={pc1} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Được quan tâm</h3>
                </li>
                <li className='text-center'>
                    <img src={pc2} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Y tế</h3>
                </li>
                <li className='text-center'>
                    <img src={pc3} alt="" className='rounded-[50%] size-[222px]' />
                    <h3 className='text-[18px] font-semibold mt-5'>Bài viết liên quan</h3>
                </li>
            </ul>
        </div>
    )
}

export default Suggest
