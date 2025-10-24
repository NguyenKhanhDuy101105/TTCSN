import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const HeaderMain = ({ check }) => {
    const text = ["Tìm chuyên khoa", "Tìm bệnh viện", "Tìm phòng khám", "Tìm bác sĩ", "Tìm gói khám tổng quát"]
    const [indexFind, setIndexFind] = useState(0)
    const [select, setSelected] = useState(`${check}`)
    const [elementSearch, setElementSearch] = useState(true)
    const [mount, setMount] = useState(false)
    useEffect(() => {
        if (select === "tatca") {
            setElementSearch(false);
        } else {
            setElementSearch(true);
        }
    }, [select]);

    function handleSelect(selectButton) {
        setSelected(selectButton)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexFind((prev) => (prev + 1) % text.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [text.length]);

    return (
        <>
            <div className="w-screen bg-[#ecfffb] fixed top-0 right-0 left-0 z-10 lg:pb-0 pb-10">
                <div className="w-full max-w-[1300px] h-[100px] bg-[#ecfffb] mx-auto flex items-center relative px-5 lg:px-0">

                    <div className="flex items-center gap-1 mr-3">
                        <i className="fa-solid fa-notes-medical text-[30px] text-[#f6c310]"></i>
                        <p className="text-[32px] font-bold text-[#f6c310]">HealthCare</p>
                    </div>


                    <ul className={`${elementSearch ? "mr-4" : "mr-60"} flex gap-2 justify-between font-medium absolute lg:left-60 lg:top-7.5 top-22 w-full lg:w-auto pr-5 lg:pr-0`}>
                        <Link to="/" onClick={() => { handleSelect("tatca") }}
                            className={`${select === "tatca" ? "text-white font-semibold  bg-[#eec965]" : "text-black font-normal"} 
                        text-[18px] cursor-pointer px-3 py-2 rounded-3xl transition-colors duration-200 ease-in-out`}
                        >Tất cả</Link>
                        <Link to="/athousepage" onClick={() => { handleSelect("tainha") }}
                            className={`${select === "tainha" ? "text-white font-semibold  bg-[#eec965]" : "text-black font-normal"} 
                        text-[18px] cursor-pointer px-3 py-2 rounded-3xl transition-colors duration-200 ease-in-out`}
                        >Tại nhà</Link>
                        <Link to="/athopitalpage" onClick={() => { handleSelect("taivien") }}
                            className={`${select === "taivien" ? "text-white font-semibold  bg-[#eec965]" : "text-black font-normal"} 
                        text-[18px] cursor-pointer px-3 py-2 rounded-3xl transition-colors duration-200 ease-in-out`}
                        >Tại viện</Link>
                        <Link to="/athealthlife" onClick={() => { handleSelect("songkhoe") }}
                            className={`${select === "songkhoe" ? "text-white font-semibold  bg-[#eec965]" : "text-black font-normal"} 
                        text-[18px] cursor-pointer px-3 py-2 rounded-3xl transition-colors duration-200 ease-in-out`}
                        >Sống khỏe</Link>
                    </ul>

                    {elementSearch && (
                        <div className='w-auto relative  transition-colors duration-200 ease-in-out lg:ml-108 ml-1'>
                            <i class="fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 left-3 text-[16px]"></i>
                            <input className=' bg-white rounded-4xl w-[300px] pl-10 pr-8  py-3  border border-gray-200 outline-none text-[16px]'
                                type="text" placeholder={text[indexFind]} />
                        </div>
                    )}

                    <ul className="flex gap-5  items-center justify-self-end ml-auto">
                        <li className="flex items-center gap-1">
                            <i class="fa-solid fa-clock-rotate-left text-[#45c3d1] text-[20px]"></i>
                            <span className='text-[18px] font-semibold text-[#45c3d1] cursor-pointer'>Lịch hẹn</span>
                        </li>
                        <li onMouseEnter={() => setMount(true)}
                            onMouseLeave={() => setMount(false)}
                            className="flex items-center gap-1">
                            <i className="fa-solid fa-circle-user text-[#45c3d1] text-[20px]"></i>
                            <p className="text-[18px] font-semibold text-[#45c3d1] cursor-pointer">Tài khoản</p>
                        </li>
                    </ul>

                    <div onMouseLeave={() => setMount(false)}
                        className={`${mount ? "block" : "hidden"}  absolute bg-white rounded-lg top-18 right-0 flex flex-col z-11`}>
                        <Link to="/loginpage"
                            state={{ isLogin: true }}
                            className="text-[18px] font-medium text-[#45c3d1] 
                            cursor-pointer px-5 py-2 hover:bg-gray-200 rounded-tr-lg rounded-tl-lg border-b border-gray-200">
                            Đăng nhập
                        </Link>
                        <Link to="/loginpage"
                            state={{ isLogin: false }}
                            className="text-[18px] font-medium text-[#45c3d1] 
                        cursor-pointer px-5 py-2  hover:bg-gray-200 rounded-br-lg rounded-bl-lg">
                            Đăng ký
                        </Link>
                    </div>

                    <div onMouseEnter={() => setMount(true)}
                        className='absolute w-[140px] h-[30px] top-[55px] right-0'></div>
                </div>
            </div >
        </>
    )
}

export default HeaderMain
