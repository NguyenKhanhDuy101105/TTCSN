import React, { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import bs1 from "../assets/images/doctor/bs1.png"
import bs2 from "../assets/images/doctor/bs2.png"
import bs3 from "../assets/images/doctor/bs3.png"
import bs4 from "../assets/images/doctor/bs4.png"
import bs5 from "../assets/images/doctor/bs5.png"
import bs6 from "../assets/images/doctor/bs6.png"
import bs7 from "../assets/images/doctor/bs7.png"
import bs8 from "../assets/images/doctor/bs8.png"
import nen from "../assets/images/doctor/nen.png"
const ListDoctor = () => {
    const listDoctor = [
        {
            id: 1,
            name: "Bác sĩ CK II Nguyễn Văn Quýnh",
            img: bs1,
            specialty: "Tim mạch",
        },
        {
            id: 2,
            name: "Bác sĩ Nguyễn Thị Hoài An",
            img: bs2,
            specialty: "Tai Mũi Họng,Nhi khoa",
        },
        {
            id: 3,
            name: "Bác sĩ Trần Thị Mai Thy",
            img: bs3,
            specialty: "Thần kinh",
        },
        {
            id: 4,
            name: "Bác sĩ CKII Nguyễn Tiến Lãng",
            img: bs4,
            specialty: "Tiểu đường - Nội tiết",
        },
        {
            id: 5,
            name: "Bác sĩ Chuyên khoa II Võ Văn Mẫn",
            img: bs5,
            specialty: "Cơ Xương Khớp",
        },
        {
            id: 6,
            name: "Giáo sư, Tiến sĩ Hà Văn Quyết",
            img: bs6,
            specialty: "Tiêu hóa",
        },
        {
            id: 7,
            name: "Bác sĩ Chuyên khoa II Lê Hồng Anh",
            img: bs7,
            specialty: "Hô hấp - Phổi",
        },
        {
            id: 8,
            name: "Tiến sĩ, Bác sĩ Phạm Chí Lăng",
            img: bs8,
            specialty: "Cơ Xương Khớp",
        },

    ]
    const [indexStart, setIndexStart] = useState(0)
    const itemsPerPage = 4

    const listCurrent = listDoctor.slice(indexStart, indexStart + itemsPerPage)

    const handleNext = () => {
        if (indexStart + itemsPerPage < listDoctor.length) {
            setIndexStart(indexStart + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (indexStart - itemsPerPage >= 0) {
            setIndexStart(indexStart - itemsPerPage);
        }
    };
    return (
        <div className='mt-8 py-5 px-5 lg:px-0' style={{ backgroundImage: `url(${nen})` }}>
            <div className='max-w-[1300px] mx-auto relative'>
                <h2 className='text-[24px] font-semibold mb-10'>Bác sĩ nổi bật</h2>
                <ul className='flex gap-10'>
                    {listCurrent.map((item, index) => (
                        <Link className='text-center w-1/4' key={index} >
                            <img src={item.img} alt="" className='size-55 rounded-full mx-auto' />
                            <h3 className='my-2 text-[18px] font-bold'>{item.name}</h3>
                            <p className='text-[18px] text-gray-500'>{item.specialty}</p>
                        </Link>
                    ))}
                    {indexStart + itemsPerPage < listDoctor.length && (
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
                <Link to="/doctorpage"
                    className='rounded-2xl bg-[#daf3f7] text-blue-500 py-3 px-4 inline-block
            absolute top-0 right-0 cursor-pointer'>
                    <p className='font-semibold text-[20px]'>Xem thêm</p>
                </Link>
            </div>

        </div>
    )
}

export default ListDoctor
