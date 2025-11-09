import React from 'react';
import HeaderSub from '../../components/HeaderSub';
import Footer from '../../components/Footer';
import DoctorInfo from './DoctorInfor';
import DoctorSchedule from './DoctorSchedule';
import DoctorClinicInfo from './DoctorClinicInfo';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import listDoctorData from '../../components/data/DoctorData';

const Doctor = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    // lấy doctor từ state (nếu có)
    const doctor_ = location.state?.doctor
        || listDoctorData.find((d) => String(d.id) === String(id)); // fallback khi reload

    if (!doctor_) {
        return (
            <>
                <HeaderSub />
                <div className="max-w-[1300px] mx-auto mt-10 text-center">
                    <p className="text-red-600">Không tìm thấy thông tin bác sĩ.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-sky-500 text-white rounded"
                    >
                        Quay lại
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div>
            <HeaderSub />
            <div className='max-w-[1300px] mx-auto mt-5'>
                {/* Phần info */}
                <DoctorInfo doctor={doctor_.doctor} />

                <div className='flex gap-x-5 mt-5'>
                    {/* Lịch khám */}
                    <div className='flex-1 border-r border-gray-300 pr-5 w-3/5'>
                        <DoctorSchedule schedule={doctor_.schedule} doctor={doctor_.doctor} />
                    </div>
                    {/* Thông tin phòng khám */}
                    <div className='w-2/5'>
                        <DoctorClinicInfo
                            clinic={doctor_.clinic}
                            price={doctor_.price}
                            insurance={doctor_.insurance}
                        />
                    </div>
                </div>

                {/* Mô tả bác sĩ */}
                <div className='mt-5'>
                    <h3 className='font-bold text-lg mb-2'>Giới thiệu về bác sĩ</h3>
                    <ul className='list-disc pl-5 space-y-1'>
                        {doctor_.about?.experience?.map((exp, i) => (
                            <li key={i}>{exp}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Doctor;
