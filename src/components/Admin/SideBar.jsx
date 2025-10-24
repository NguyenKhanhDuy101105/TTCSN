import { MdDashboard, MdMiscellaneousServices } from "react-icons/md";
import { FaHospitalAlt, FaStethoscope, FaUserMd, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from 'react'

const SideBar = ({ danhMuc, index, setIndex }) => {
    const icon = [
        <MdDashboard />,
        <FaHospitalAlt />,
        <FaStethoscope />,
        <FaUserMd />,
        <MdMiscellaneousServices />,
        <FaRegCalendarAlt />,
    ]
    const path = [
        "/admin",             // Dashboard
        "/admin/medical",      //Cơ sở y tế
        "/admin/specialties",// chuyen khoa
        "/admin/doctors",      // Bác sĩ
        "/admin/services",    // Dịch vụ
        "/admin/appointments", // Lịch hẹn
        "/admin/examination", // Khám bệnh
    ];
    return (
        <div className='h-screen pt-[100px] w-[280px] text-white font-bold bg-[#a35a37] fixed top-0 bottom-0 left-0'>
            <ul className='pl-4 py-2'>
                {danhMuc.map((item, i) => (
                    <Link to={path[i]} className={`mb-4 cursor-pointer flex items-center py-3 px-4 rounded-lg
                        w-[245px] text-left transition-all duration-200 font-medium border border-[#ad7555]
                        hover:text-[#ad7555] hover:bg-white
                        shadow-md transform hover:scale-105 hover:shadow-lg   
                        ${i == index ? 'text-[#ad7555] bg-white transform scale-105' : 'text-white'}`}
                        onClick={() => setIndex(i)}>
                        <span className="size-[21px]">{icon[i]}</span>
                        <p className="ml-1 text-[16px]"> {item}</p>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default SideBar
