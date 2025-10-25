import React, { useState } from 'react'
import { Link } from "react-router-dom";
import pc1 from "../assets/images/remote_/r1.png"
import pc2 from "../assets/images/remote_/r2.png"
import pc3 from "../assets/images/remote_/r3.png"
import pc4 from "../assets/images/remote_/r4.png"
import pc5 from "../assets/images/remote_/r5.png"
import pc6 from "../assets/images/remote_/r6.png"
import pc7 from "../assets/images/remote_/r7.png"
import pc8 from "../assets/images/remote_/r8.png"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Remote = () => {
    const list = [
        {
            id: 1,
            name: "Tư vấn, trị liệu Tâm lý từ xa",
            image: pc1,
        },
        {
            id: 2,
            name: "Sức khỏe tâm thần từ xa",
            image: pc2,
        },
        {
            id: 3,
            name: "Bác sĩ Da Liễu từ xa",
            image: pc3,
        },
        {
            id: 4,
            name: "Bác sĩ Cơ-Xương-Khớp từ xa",
            image: pc4,
        },
        {
            id: 5,
            name: "Bác sĩ Tim Mạch từ xa",
            image: pc5,
        },
        {
            id: 6,
            name: "Bác sĩ Tiêu Hóa từ xa",
            image: pc6,
        },
        {
            id: 7,
            name: "Bác sĩ Tai-Mũi-Họng từ xa",
            image: pc7,
        },
        {
            id: 8,
            name: "Bác sĩ Thần Kinh từ xa",
            image: pc8,
        },
    ]
    const [indexStart, setIndexStart] = useState(0)
    const itemsPerPage = 3

    const listCurrent = list.slice(indexStart, indexStart + itemsPerPage)

    const handleNext = () => {
        if (indexStart + itemsPerPage < list.length) {
            setIndexStart(indexStart + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (indexStart - itemsPerPage >= 0) {
            setIndexStart(indexStart - itemsPerPage);
        }
    };
    return (
        <div className='max-w-[1300px] mx-auto mt-15 relative px-5 lg:px-0'>
            <h2 className='text-[24px] font-semibold mb-10'>Khám từ xa</h2>
            <ul className='flex gap-12 relative'>
                {listCurrent.map((item, index) => (
                    <Link key={index} className='w-1/3 text-center rounded-2xl border border-gray-200 py-5'>
                        <img className='w-[380px] h-[216px] mx-auto rounded-2xl'
                            src={item.image} alt="anh" />
                        <h3 className='font-semibold text-[18px] mt-3'>{item.name}</h3>
                    </Link>
                ))}
                {indexStart + itemsPerPage < list.length && (
                    <div onClick={handleNext}
                        className='size-10 border border-blue-300 rounded-[8px] 
                flex justify-center items-center bg-white cursor-pointer
                absolute -right-5 top-1/2 -translate-y-1/2 z-9'>
                        <IoIosArrowForward className='size-[24px] text-blue-600' />
                    </div>
                )}
                {indexStart > 0 && (
                    <div onClick={handlePrev}
                        className='size-10 border border-blue-300 rounded-[8px] 
                flex justify-center items-center bg-white cursor-pointer
                absolute -left-5 top-1/2 -translate-y-1/2 z-9'>
                        <IoIosArrowBack className='size-[24px] text-blue-600' />
                    </div>
                )}
            </ul>
            <Link to="/remotepage"
                className='rounded-2xl bg-[#daf3f7] text-blue-500 py-3 px-4 inline-block
            absolute top-0 right-0 cursor-pointer
            '>
                <p className='font-semibold text-[20px]'>Xem thêm</p>
            </Link>

        </div>
    )
}

export default Remote
