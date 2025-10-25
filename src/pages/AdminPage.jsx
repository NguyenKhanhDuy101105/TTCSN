import React, { useState } from 'react'
import HeaderAdmin from '../components/Admin/HeaderAdmin'
import SideBar from '../components/Admin/SideBar'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
    const danhMuc = [
        "Thống kê",
        "Quản lý cơ sở y tế",
        "Quản lý chuyên khoa",
        "Quản lý bác sĩ",
        "Quản lý dịch vụ",
        "Quản lý lịch hẹn",
    ]

    const [index, setIndex] = useState(0)

    return (
        <div>
            {/* Header */}
            <HeaderAdmin danhMuc={danhMuc} index={index} />

            {/* Sidebar */}
            <SideBar danhMuc={danhMuc} index={index} setIndex={setIndex} />

            {/* Nội dung chính (hiển thị component con theo route) */}
            <div className="mt-[100px] ml-[280px] h-[630px] p-5">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage
