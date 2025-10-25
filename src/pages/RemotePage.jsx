import React from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import r1 from '../assets/images/remote_/r1.png'
import r2 from '../assets/images/remote_/r2.png'
import r3 from '../assets/images/remote_/r3.png'
import r4 from '../assets/images/remote_/r4.png'
import r5 from '../assets/images/remote_/r5.png'
import r6 from '../assets/images/remote_/r6.png'
import r7 from '../assets/images/remote_/r7.png'
import r8 from '../assets/images/remote_/r8.png'
const RemotePage = () => {

    const list = [
        {
            id: 1,
            name: "Tư vấn, trị liệu Tâm lý từ xa",
            image: r1,
            path: "",
        },
        {
            id: 2,
            name: "Sức khỏe tâm thần từ xa",
            image: r2,
        },
        {
            id: 3,
            name: "Bác sĩ Da liễu từ xa",
            image: r3,
        },
        {
            id: 4,
            name: "Bác sĩ Cơ-Xương-Khớp từ xa",
            image: r4,
        },
        {
            id: 5,
            name: "Bác sĩ Tiêu hóa từ xa",
            image: r5,
        },
        {
            id: 6,
            name: "Bác sĩ Tim mạch từ xa",
            image: r6,
        },
        {
            id: 7,
            name: "Bác sĩ Tai-Mũi-Họng từ xa",
            image: r7,
        },
        {
            id: 8,
            name: "Bác sĩ Thần kinh từ xa",
            image: r8,
        },
    ]

    return (
        <div>
            <HeaderSub />
            <div className='pt-[100px] max-w-[1300px] mx-auto'>
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i class="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Khám từ xa</span>
                </p>
                <ul className='flex flex-wrap gap-x-5 gap-y-5 pt-5'>
                    {list.map(e => (
                        <Link to={e.path}>
                            <img className='w-[310px] h-[161px]'
                                src={e.image}
                                alt="" />
                            <p className='font-semibold mt-1'>{e.name}</p>
                        </Link>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default RemotePage
