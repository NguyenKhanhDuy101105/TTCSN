import React, { useState, useEffect } from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import AccountInfor from '../components/User/AccountInfor'
import ChangePassword from '../components/User/ChangePassword'
import Schedule from '../components/User/Schedule'
const UserPage = () => {
    const location = useLocation()
    const [indexPage, setIndexPage] = useState(0)

    useEffect(() => {
        if (location.state && location.state.indexPage !== undefined) {
            setIndexPage(location.state.indexPage);
        }
    }, [location.state]);
    return (
        <>
            <HeaderSub />
            <div className='max-w-[1300px] mx-auto mt-5 flex gap-5'>
                <div className='w-[20%] flex flex-col gap-y-2 border-r pr-0.5 border-gray-200'>
                    <Link className={`${indexPage == 0 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(0)}>Thông tin tài khoản</Link>
                    <Link className={`${indexPage == 1 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(1)}>Lịch khám của bạn</Link>
                    <Link className={`${indexPage == 2 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(2)}>Đổi mật khẩu</Link>
                </div>
                <div className='w-[80%]'>
                    {indexPage == 0 && <AccountInfor />}
                    {indexPage == 1 && <Schedule />}
                    {indexPage == 2 && <ChangePassword />}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserPage
