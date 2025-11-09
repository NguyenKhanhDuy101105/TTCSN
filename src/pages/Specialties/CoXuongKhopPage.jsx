import React from 'react'
import HeaderSub from '../../components/HeaderSub'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import DoctorDetail from '../../components/Doctor/DoctorDetail'
import listDoctorData from '../../components/data/DoctorData'
const CoXuongKhopPage = () => {

    return (
        <div>
            <HeaderSub />
            <div className='max-w-[1300px] mx-auto'>
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i class="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium text-blue-400'>Khám chuyên khoa</span>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Cơ xương khớp</span>
                </p>
                <div className='flex gap-x-3 mt-5'>
                    <div>
                        <select
                            name="gender"
                            className="w-[200px] border border-gray-300 rounded-[4px] shadow-sm p-2 focus:outline-none focus:border-[#bb4d00]"
                        >
                            <option value="">Toàn quốc</option>
                            <option value="Hanoi">Hà Nội</option>
                            <option value="Hochiminh">Tp Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="gender"
                            className="w-[200px] border border-gray-300 rounded-[4px] shadow-sm p-2 focus:outline-none focus:border-[#bb4d00]"
                        >
                            <option value="">Chọn ngày</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className='mt-5 space-y-5'>
                    <div className='mt-5 space-y-5'>
                        {listDoctorData.map((item) => (
                            <div key={item.id}>
                                <DoctorDetail data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CoXuongKhopPage
