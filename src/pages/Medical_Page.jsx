import React from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/medical/m1.png"
import img2 from "../assets/images/medical/m2.png"
import img3 from "../assets/images/medical/m3.png"

const MedicalPage = () => {

    const listMedical = [
        {
            id: 1,
            name: "Bệnh viện Hữu nghị Việt Đức",
            image: img1,
            path: ""
        },
        {
            id: 2,
            name: "Bệnh viện Chợ Rẫy",
            image: img2,
            path: ""
        },
        {
            id: 3,
            name: "Bệnh viện Đa khoa An Việt",
            image: img3,
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
                    <span className='font-medium'>Cơ sở y tế</span>
                </p>
                <h2 className='font-semibold text-[18px] pt-3'>Danh sách cơ sở y tế</h2>
                <div className='mt-5'>
                    {listMedical.map((item, index) => (
                        <Link className='flex gap-x-3 items-center mb-5 border-b-1 pb-5 border-gray-300'
                            key={index} to="">
                            <img className='w-[160px] h-[120px]'
                                src={item.image} alt="" />
                            <div className=''>
                                <h3 className='font-medium'>{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MedicalPage
