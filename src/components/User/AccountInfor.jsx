import React, { useEffect, useState } from 'react';
import Infor from './Infor';
import InforForm from './InforForm';

const AccountInfor = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;

        fetch(`http://localhost:8080/api/auth/user?email=${email}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Lỗi lấy dữ liệu");
                return response.json();
            })
            .then(data => setUser(data))
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            });
    }, []);

    if (!user) return <p>Đang tải thông tin...</p>;

    return (
        <div className='w-full border rounded-[12px] border-gray-300 shadow-md'>
            <h2 className='bg-[#70b8e8] text-white rounded-t-[12px] px-5 py-2 font-bold text-[24px]'>
                Thông tin tài khoản
            </h2>
            <div className='flex px-5 gap-x-5 pt-2'>
                <div className='pt-5 text-center flex flex-col items-center'>
                    <img
                        className='rounded-[50%] size-[120px]'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&s"
                        alt="avatar"
                    />
                    <p className='font-semibold mt-2'>{user.fullName}</p>
                </div>
                <div className='flex-1 py-5 ml-5'>
                    {isEditing
                        ? <InforForm user={user} setUser={setUser} setIsEditing={setIsEditing} />
                        : <Infor user={user} setIsEditing={setIsEditing} />}
                </div>
            </div>
        </div>
    );
};

export default AccountInfor;
