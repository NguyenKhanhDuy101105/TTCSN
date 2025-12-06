import React, { useState, useEffect } from 'react';
import HeaderSub from '../components/HeaderSub';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import AccountInfor from '../components/User/AccountInfor';
import ChangePassword from '../components/User/ChangePassword';
import BookingItem from '../components/User/BookingItem';

const UserPage = () => {
    const location = useLocation();
    const [indexPage, setIndexPage] = useState(0);

    // Lưu toàn bộ lịch khám
    const [allBookings, setAllBookings] = useState([]);
    const [page, setPage] = useState(0);
    const size = 2; // số lịch trên 1 trang
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Tổng số trang tính từ allBookings
    const totalPages = Math.ceil(allBookings.length / size);

    // Xét indexPage từ location.state nếu có
    useEffect(() => {
        if (location.state && location.state.indexPage !== undefined) {
            setIndexPage(location.state.indexPage);
        }
    }, [location.state]);

    // Fetch toàn bộ lịch khám 1 lần và sort theo ngày + giờ
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Chưa đăng nhập!");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/bookings/my?page=0&size=1000`, { // fetch đủ lớn để lấy tất cả
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const sortedBookings = [...data.data.content].sort((a, b) => {
                        const dateA = new Date(`${a.ngayKham}T${a.gioKham}`);
                        const dateB = new Date(`${b.ngayKham}T${b.gioKham}`);
                        return dateA - dateB;
                    });
                    setAllBookings(sortedBookings);
                } else {
                    setError(data.message || "Lỗi khi lấy dữ liệu");
                }
            })
            .catch(err => setError("Lỗi fetch API: " + err.message))
            .finally(() => setLoading(false));
    }, []);

    // Lấy dữ liệu phân trang từ allBookings
    const bookings = allBookings.slice(page * size, (page + 1) * size);

    return (
        <>
            <HeaderSub />
            <div className='max-w-[1300px] mx-auto mt-5 flex gap-5'>
                <div className='w-[20%] flex flex-col gap-y-2 border-r pr-0.5 border-gray-200'>
                    <Link className={`${indexPage === 0 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(0)}>Thông tin tài khoản</Link>
                    <Link className={`${indexPage === 1 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(1)}>Lịch khám của bạn</Link>
                    <Link className={`${indexPage === 2 ? "border-[#bb4d00] bg-[#f2edea] text-amber-800" : "border-gray-400"} py-3 px-4 border-l-4 hover:bg-gray-100 rounded-[4px] font-medium`}
                        onClick={() => setIndexPage(2)}>Đổi mật khẩu</Link>
                </div>
                <div className='w-[80%]'>
                    {indexPage === 0 && <AccountInfor />}

                    {indexPage === 1 && (
                        <>
                            {loading && <p>Đang tải lịch khám...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {!loading && !error && <BookingItem items={bookings} />}

                            {!loading && !error && totalPages > 1 && (
                                <div className="flex justify-end gap-2 mt-3">
                                    <button
                                        className="px-3 py-1 border border-gray-300 bg-gray-100 rounded hover:bg-gray-300 cursor-pointer"
                                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                        disabled={page === 0}
                                    >
                                        &lt;
                                    </button>
                                    <span className="px-3 py-1 border rounded border-gray-300">{page + 1} / {totalPages}</span>
                                    <button
                                        className="px-3 py-1 border border-gray-300 bg-gray-100 rounded hover:bg-gray-300 cursor-pointer"
                                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                                        disabled={page === totalPages - 1}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {indexPage === 2 && <ChangePassword />}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserPage;
