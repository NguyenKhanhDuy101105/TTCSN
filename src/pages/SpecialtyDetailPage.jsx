import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import DoctorDetail from '../components/Doctor/DoctorDetail'
import listDoctorData from '../components/data/DoctorData'

const SpecialtyDetailPage = () => {
    const { slug } = useParams(); // lấy tên chuyên khoa từ URL
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        // ✅ Nếu dùng API thật:
        // fetch(`/api/doctors?specialty=${slug}`)
        //   .then(res => res.json())
        //   .then(data => setDoctorList(data));

        // ✅ Nếu bạn đang dùng data giả (DoctorData):
        const filteredDoctors = listDoctorData.filter(
            (d) => d.specialtySlug === slug
        );
        setDoctorList(filteredDoctors);
    }, [slug]);

    // Đặt tiêu đề hiển thị (cho đẹp hơn slug)
    const specialtyName = {
        'co-xuong-khop': 'Cơ xương khớp',
        'da-lieu': 'Da liễu',
        'tim-mach': 'Tim mạch'
    }[slug] || 'Chuyên khoa';

    return (
        <div>
            <HeaderSub />
            <div className='max-w-[1300px] mx-auto'>
                {/* Breadcrumb */}
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i className="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium text-blue-400'>Khám chuyên khoa</span>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>{specialtyName}</span>
                </p>

                {/* Bộ lọc */}
                <div className='flex gap-x-3 mt-5'>
                    <select
                        className="w-[200px] border border-gray-300 rounded-[4px] shadow-sm p-2 focus:outline-none focus:border-[#bb4d00]"
                    >
                        <option value="">Toàn quốc</option>
                        <option value="Hanoi">Hà Nội</option>
                        <option value="Hochiminh">Tp Hồ Chí Minh</option>
                    </select>

                    <select
                        className="w-[200px] border border-gray-300 rounded-[4px] shadow-sm p-2 focus:outline-none focus:border-[#bb4d00]"
                    >
                        <option value="">Chọn ngày</option>
                    </select>
                </div>

                {/* Danh sách bác sĩ */}
                <div className='mt-5 space-y-5'>
                    {doctorList.length > 0 ? (
                        doctorList.map((item) => (
                            <DoctorDetail key={item.id} data={item} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Chưa có bác sĩ trong chuyên khoa này.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SpecialtyDetailPage
