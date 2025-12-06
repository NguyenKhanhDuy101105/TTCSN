import React from 'react'
import { FaUserMd } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { AiFillCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrSchedules } from "react-icons/gr";

const SidebarDoctor = ({ danhMuc, index, setIndex, sidebarOpen }) => {
    const icons = [<FaUserMd />, <AiFillCalendar />, <RiCalendarScheduleFill />, <GrSchedules />];
    const paths = ["/bacsi/infor", "/bacsi/schedule", "/bacsi/appointment", "/bacsi/meetings"];

    return (
        <div className={`h-screen pt-[100px] text-white font-bold bg-[#81c9f9] fixed top-0 bottom-0 left-0 
            transition-all duration-300 
            ${sidebarOpen ? 'w-[280px]' : 'w-[0px] overflow-hidden'}`}
        >
            <ul className='pl-4 py-2'>
                {danhMuc.map((item, i) => (
                    <Link
                        key={i}
                        to={paths[i]}
                        className={`mb-4 cursor-pointer flex items-center py-3 px-4 rounded-lg w-[245px] text-left transition-all duration-200 font-medium
                            border border-[#5fa8d3] 
                            hover:bg-white hover:text-[#1d4e89] hover:border-[#1d4e89]
                            shadow-sm hover:shadow-md transform hover:scale-105
                            ${i === index ? 'bg-white text-[#1d4e89] border-[#1d4e89] shadow-md scale-105' : 'text-white'}`}
                        onClick={() => setIndex(i)}
                    >
                        <span className="text-[21px]">{icons[i]}</span>
                        <p className="ml-1 text-[16px]">{item}</p>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
export default SidebarDoctor