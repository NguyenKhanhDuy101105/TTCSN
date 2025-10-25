import React, { useState } from 'react'
import Infor from './Infor'
import InforForm from './InforForm'
const AccountInfor = () => {
    const [infor, setInfor] = useState(true)

    const user =
    {
        full_name: "Nguyen Van A",
        email: "nguyenvanA@gmail.com",
        phone: "01234",
        dob: "11/11/2006",
        gender: "Male",
        address: "Ha Noi"
    }

    return (
        <div className='w-full border rounded-[12px] border-gray-300 shadow-md'>
            <h2 className='bg-amber-700 text-white rounded-t-[12px] px-5 py-2 font-bold text-[24px]'>Thông tin tài khoản</h2>
            <div className='flex px-5 gap-x-5 pt-2'>
                <div className=' pt-5'>
                    <img className='rounded-[50%] size-[120px]'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&s" alt="" />
                    <p>{user.full_name}</p>
                </div>
                <div className='flex-1 py-5 ml-5'>
                    {infor == true ? <Infor user={user} setInfor={setInfor} /> : <InforForm user={user} setInfor={setInfor} />}
                </div>
            </div>
        </div>
    )
}

export default AccountInfor
