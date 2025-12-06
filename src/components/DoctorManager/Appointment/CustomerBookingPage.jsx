import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";

const CustomerBookingPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            fetch(`http://localhost:8080/api/dat-lich?date=${selectedDate}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(err => console.error("Lỗi lấy lịch đặt:", err));
        }
    }, [selectedDate]);

    const handleConfirm = async (id) => {
        await fetch(`http://localhost:8080/api/dat-lich/confirm/${id}`, {
            method: "PUT",
        });

        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, trangThai: "DaXacNhan" } : b))
        );
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Bạn có chắc muốn hủy lịch này không?")) return;

        await fetch(`http://localhost:8080/api/dat-lich/cancel/${id}`, {
            method: "PUT",
        });

        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, trangThai: "DaHuy" } : b))
        );
    };

    return (
        <div className="p-6 min-h-[300px] border border-gray-300 rounded-2xl shadow-sm bg-white">
            {/* Chọn ngày */}
            <div className="mb-5">
                <input
                    type="date"
                    className="border p-2 rounded-lg border-gray-400"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Bảng lịch */}
            <BookingTable
                bookings={bookings}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default CustomerBookingPage;
