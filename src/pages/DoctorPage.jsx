import React from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/doctor/bs7.png"
import img2 from "../assets/images/doctor/bs9.png"
import img3 from "../assets/images/doctor/bs10.png"
import img4 from "../assets/images/doctor/bs11.png"
const DoctorPage = () => {

    const listDoctor = [
        {
            id: 1,
            name: "Bác sĩ Chuyên khoa II Lê Hồng Anh",
            specialty: "Hô hấp - Phổi",
            image: img1,
            path: ""
        },
        {
            id: 2,
            name: "Tiến sĩ, Bác sĩ Nguyễn Văn Doanh",
            specialty: "Thần kinh",
            image: img2,
            path: ""
        },
        {
            id: 3,
            name: "Phó Giáo sư, Tiến sĩ Kiều Đình Hùng",
            specialty: "Thần kinh",
            image: img3,
            path: ""
        },
        {
            id: 4,
            name: "Tiến sĩ, Bác sĩ Chuyên khoa II Trà Anh Duy",
            specialty: "Thần kinh",
            image: img4,
            path: ""
        },

    ]

    return (
        <div>
            <HeaderSub />
            <div className=' max-w-[1300px] mx-auto'>

                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i class="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Danh sách bác sĩ</span>
                </p>
                <h2 className='font-semibold text-[18px] pt-3'>Danh sách bác sĩ</h2>
                <div className='mt-5'>
                    {listDoctor.map((item, index) => (
                        <Link className='flex gap-x-3 items-center mb-5 border-b-1 pb-5 border-gray-300'
                            key={index} to="">
                            <img className='size-[110px] rounded-[50%]'
                                src={item.image} alt="" />
                            <div className=''>
                                <h3 className='font-medium'>{item.name}</h3>
                                <p>{item.specialty}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DoctorPage
