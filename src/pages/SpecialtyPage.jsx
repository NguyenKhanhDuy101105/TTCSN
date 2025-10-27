import React from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import s1 from '../assets/images/specialty/s1.png'
import s2 from '../assets/images/specialty/s2.png'
import s3 from '../assets/images/specialty/s3.png'
import s4 from '../assets/images/specialty/s4.png'
import s5 from '../assets/images/specialty/s5.png'
import s6 from '../assets/images/specialty/s6.png'
const SpecialtyPage = () => {

    const list = [
        {
            id: 1,
            name: "Cơ xương khớp",
            image: s1,
            path: "/coxuongkhop",
        },
        {
            id: 2,
            name: "Thần kinh",
            image: s2,
        },
        {
            id: 3,
            name: "Tiêu hóa",
            image: s3,
        },
        {
            id: 4,
            name: "Tim mạch",
            image: s4,
        },
        {
            id: 5,
            name: "Tai Mũi Họng",
            image: s5,
        },
        {
            id: 6,
            name: "Cột sống",
            image: s6,
        },

    ]

    return (
        <div>
            <HeaderSub />
            <div className=' max-w-[1300px] mx-auto'>
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i class="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Khám chuyên khoa</span>
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

export default SpecialtyPage
