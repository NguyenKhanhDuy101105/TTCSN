import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import m1 from "../assets/images/medical/m1.png"
import m2 from "../assets/images/medical/m2.png"
import m3 from "../assets/images/medical/m3.png"
import m4 from "../assets/images/medical/m4.png"
import m5 from "../assets/images/medical/m5.png"
import m6 from "../assets/images/medical/m6.png"

const Medical = () => {
    const list = [
        {
            id: 1,
            name: "Bệnh viện Hữu nghị Việt Đức",
            image: m1,
        },
        {
            id: 2,
            name: "Bệnh viện Chợ Rẫy",
            image: m2,
        },
        {
            id: 3,
            name: "Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn",
            image: m3,
        },
        {
            id: 4,
            name: "Phòng khám Bệnh viện Đại học Y Dược 1",
            image: m4,
        },
        {
            id: 5,
            name: "Bệnh viện Ung bướu Hưng Việt",
            image: m5,
        },
        {
            id: 6,
            name: "Hệ thống y tế MEDLATEC",
            image: m6,
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
            <h2 className='text-[24px] font-semibold mb-10'>Cơ sở y tế</h2>
            <ul className='flex gap-12 relative'>
                {listCurrent.map((item, index) => (
                    <Link key={index} className='w-1/3 text-center rounded-2xl border border-gray-200 p-5'>
                        <img className='w-[280px] h-[170px] mx-auto rounded-2xl'
                            src={item.image} alt="anh" />
                        <h3 className='font-semibold text-[18px] mt-6'>{item.name}</h3>
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
            <Link className='rounded-2xl bg-[#daf3f7] text-blue-500 py-3 px-4 inline-block
            absolute top-0 right-0 cursor-pointer
            '>
                <p className='font-semibold text-[20px]'>Xem thêm</p>
            </Link>

        </div>
    )
}

export default Medical
