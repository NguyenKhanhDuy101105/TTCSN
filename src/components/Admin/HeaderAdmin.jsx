import React, { useState } from 'react'
import { FiMenu, FiX } from "react-icons/fi";

const HeaderAdmin = ({ danhMuc, index }) => {
    const [icon, setIcon] = useState(true)
    return (
        <div className='w-screen fixed top-0 left-0 right-0 h-[100px] bg-[#a35a37] text-white flex items-center z-1'>
            <div className='pl-4'>
                {icon ? (
                    <div className='flex items-center'>
                        <FiMenu className="size-8 cursor-pointer" onClick={() => setIcon(false)} />
                        <p className='font-bold text-[28px] ml-2'>{danhMuc[index]}</p>
                    </div>)
                    : (<div className='flex items-center'>
                        <FiX className="size-8 cursor-pointer" onClick={() => setIcon(true)} />
                        <p className='font-bold text-[28px] ml-2'>{danhMuc[index]}</p>
                    </div>)}
            </div>
            <div>

            </div>
        </div>
    )
}

export default HeaderAdmin
