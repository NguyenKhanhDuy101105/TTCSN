import React from 'react'
import { Link } from "react-router-dom"
const HeaderSub = () => {

    return (
        <>
            <div className="w-full bg-[#ecfffb]">
                <div className="w-full max-w-[1300px] h-[100px] bg-[#ecfffb] mx-auto flex items-center relative px-5 lg:px-0">

                    <Link to="/" className="flex items-center gap-1 mr-3">
                        <i class="fa-solid fa-notes-medical text-[30px] text-[#f6c310]"></i>
                        <p className="text-[32px] font-bold text-[#f6c310]">HealthCare</p>
                    </Link>

                    <ul className='flex gap-8 ml-5'>
                        <Link to="/specialtypage" className='text-[12px]'>
                            <h3 className='font-semibold'>Chuyên khoa</h3>
                            <p>Tìm chuyên khoa</p>
                        </Link>
                        <Link to="/medicalpage" className='text-[12px]'>
                            <h3 className='font-semibold'>Cơ sở y tế</h3>
                            <p>Chọn bệnh viện phòng khám</p>
                        </Link>
                        <Link to="/doctorpage" className='text-[12px]'>
                            <h3 className='font-semibold'>Bác sĩ</h3>
                            <p>Chọn bác sĩ giỏi</p>
                        </Link>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default HeaderSub
