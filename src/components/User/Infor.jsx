import React from 'react'

const Infor = ({ user, setIsEditing }) => {
    return (
        <div className='w-full flex flex-col gap-y-3'>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Họ và tên: {user.hoTen}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Email: {user.email}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Số điện thoại: {user.soDienThoai}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Địa chỉ: {user.diaChi}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Ngày sinh: {user.ngaySinh}</p>
            <p className='bg-gray-50 px-3 py-2 rounded-[4px] font-medium'>Giới tính: {(user.gioiTinh == 1) ? "Nam" : "Nữ"}</p>
            <button onClick={() => setIsEditing(true)}
                className='px-4 py-2 cursor-pointer mr-auto  bg-sky-500 hover:bg-sky-600 rounded-[8px] text-white font-medium'
            >Sửa thông tin</button>
        </div>
    )
}

export default Infor
