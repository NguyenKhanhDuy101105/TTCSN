import React from 'react'

const Infor = ({ user, setInfor }) => {
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Họ và tên: {user.full_name}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Email: {user.email}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Số điện thoại: {user.phone}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Địa chỉ: {user.address}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Ngày sinh: {user.dob}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Giới tính: {user.gender}</p>
            <button onClick={() => setInfor(false)}
                className='px-4 py-2 cursor-pointer mr-auto bg-[#bb4d00] rounded-[8px] text-white font-medium'
            >Sửa thông tin</button>
        </div>
    )
}

export default Infor
