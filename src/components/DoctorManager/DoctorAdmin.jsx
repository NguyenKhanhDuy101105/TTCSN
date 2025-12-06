import React, { useState, useContext } from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";

const DoctorAdmin = ({ danhMuc, index, sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const { isLogin, setIsLogin, setUser } = useContext(AuthContext);
    const [mount, setMount] = useState(false)

    const userLocal = JSON.parse(localStorage.getItem("user"));
    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        localStorage.removeItem("hoTen");
        localStorage.removeItem("vaiTro");
        localStorage.removeItem("user");
        localStorage.removeItem("doctorId");
        setIsLogin(false);
        setUser(null);
        navigate("/loginpage");
    }

    return (
        <div className='w-screen fixed top-0 left-0 right-0 h-[100px] bg-[#81c9f9] text-white flex items-center z-10'>
            <div className='flex justify-between w-full px-4'>

                <div className='flex items-center'>
                    {sidebarOpen ? (
                        <FiMenu
                            className="text-2xl cursor-pointer"
                            onClick={() => setSidebarOpen(false)}
                        />
                    ) : (
                        <FiX
                            className="text-2xl cursor-pointer"
                            onClick={() => setSidebarOpen(true)}
                        />
                    )}
                    <p className='font-bold text-[28px] ml-2'>{danhMuc[index]}</p>
                </div>


                <div className='flex items-center justify-center text-[23px] pr-8 cursor-pointer'>
                    <li onMouseEnter={() => setMount(true)}
                        onMouseLeave={() => setMount(false)}
                        className="flex items-center gap-1">
                        <FaUserDoctor className='mr-1' />
                        <p className="font-semibold max-w-[300px] truncate overflow-hidden whitespace-nowrap">
                            {isLogin && userLocal ? userLocal.hoTen : "Tài khoản"}
                        </p>
                    </li>
                </div>


                <div onMouseEnter={() => setMount(true)}
                    onMouseLeave={() => setMount(false)}
                    onClick={handleLogout}
                    className={`${mount ? "block" : "hidden"}
                        absolute text-red-500 bg-white px-4 py-2 rounded-lg font-medium shadow-md
                        top-[75px] right-[42px] cursor-pointer`}>
                    <div className='flex justify-center items-center'>
                        <i className="fa-solid fa-right-from-bracket mr-1"></i>
                        <p>Đăng xuất</p>
                    </div>
                </div>

                <div onMouseEnter={() => setMount(true)}
                    className='absolute w-[150px] h-[30px] top-[55px] right-[45px]'>
                </div>

            </div>
        </div>
    )
}

export default DoctorAdmin
