import React, { useState, useEffect } from 'react'
import pc1 from "../assets/images/search/sea1.png"
import pc2 from "../assets/images/search/sea2.png"
import pc3 from "../assets/images/search/sea3.png"
import pc4 from "../assets/images/search/sea4.png"
import pc5 from "../assets/images/search/sea5.png"

const Search = () => {
    const text = ["Tìm phòng khám", "Tìm bác sĩ", "Tìm phòng khám", "Tìm gói xét nghiệm", "Tìm gói khám tổng quát", "Tìm bệnh viện", "Lý do khám"]
    const [indexFind, setIndexFind] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexFind((prev) => (prev + 1) % text.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [text.length]);
    return (
        <div className='bg-[#93d7ee] py-8'>
            <div className='max-w-[1300px]  mx-auto flex-col justify-center mt-[100px] text-center px-5 lg:px-0 pt-5 lg:pt-0'>
                <h1 className='text-[28px] font-bold'
                >Nền tảng đặt lịch khám bệnh, chăm sóc răng miệng và làm đẹp</h1>
                <div className='w-full relative transition-colors duration-200 ease-in-out mx-auto mt-3'>
                    <i class="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 right-4 text-[20px]"></i>
                    <input className=' bg-white rounded-4xl w-full pl-10 pr-8  py-4  border border-gray-200 outline-none text-[16px] text-gray-500'
                        type="text" placeholder={text[indexFind]} />
                </div>
                <div className='py-5 flex justify-start'>
                    <h2 className='text-[22px] font-bold py-2'>Các sản phẩm hỗ trợ</h2>
                </div>
                <div className='flex gap-3'>
                    <div className='w-1/3 bg-white rounded-2xl flex px-2 py-4 box-border'>
                        <img src={pc1} alt="" className='size-[56px]' />
                        <div className='text-start pr-5 pl-4'>
                            <h3 className='text-[18px] font-semibold'>Tư vấn đặt lịch</h3>
                            <p className='text-[18px]'>Giúp đặt lịch nhanh chóng và dễ dàng trên hệ thống của HealthCare</p>
                        </div>
                    </div>
                    <div className='w-1/3 bg-white rounded-2xl flex px-2 py-4 box-border'>
                        <img src={pc2} alt="" className='size-[56px]' />
                        <div className='text-start pr-5 pl-4'>
                            <h3 className='text-[18px] font-semibold'>Trợ lý niềng răng</h3>
                            <p className='text-[18px]'>Tìm kiếm địa chỉ, bác sĩ niềng răng giàu kinh nghiệm.</p>
                        </div>
                    </div>
                    <div className='w-1/3 bg-white rounded-2xl flex px-2 py-4 box-border'>
                        <img src={pc3} alt="" className='size-[56px]' />
                        <div className='text-start pr-5 pl-4'>
                            <h3 className='text-[18px] font-semibold'>Trợ lý niềng răng</h3>
                            <p className='text-[18px]'>Tìm bác sĩ, dịch vụ, cơ sở chuyên về điều trị mụn.</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 mt-3'>
                    <div className='w-1/3 bg-white rounded-2xl flex px-2 py-4 box-border'>
                        <img src={pc4} alt="" className='size-[56px]' />
                        <div className='text-start pr-5 pl-4'>
                            <h3 className='text-[18px] font-semibold'>Trợ lý trị mụn</h3>
                            <p className='text-[18px]'>Tìm bác sĩ, dịch vụ, cơ sở chuyên về điều trị mụn.</p>
                        </div>
                    </div>
                    <div className='w-1/3 bg-white rounded-2xl flex px-2 py-4 box-border'>
                        <img src={pc5} alt="" className='size-[56px]' />
                        <div className='text-start pr-5 pl-4'>
                            <h3 className='text-[18px] font-semibold'>Tư vấn đặt lịch</h3>
                            <p className='text-[18px]'>Giúp đặt lịch nhanh chóng và dễ dàng trên hệ thống của HealthCare</p>
                        </div>
                    </div>
                    <div className='w-1/3 rounded-2xl flex px-2 py-4 box-border'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
