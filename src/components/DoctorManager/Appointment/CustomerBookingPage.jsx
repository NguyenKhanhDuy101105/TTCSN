import React, { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import RejectModal from "./RejectModal";

const DoctorBookingPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [bookings, setBookings] = useState([]);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [currentRejectId, setCurrentRejectId] = useState(null);

    const getNext6Days = () => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 6; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const dd = String(d.getDate()).padStart(2, "0");
            days.push(`${yyyy}-${mm}-${dd}`);
        }
        return days;
    };

    const mapTrangThai = (status) => {
        switch (status) {
            case "CHO_XAC_NHAN_BAC_SI":
                return "ChoXacNhan";
            case "DA_XAC_NHAN":
                return "DaXacNhan";
            case "HUY":
                return "DaHuy";
            default:
                return status;
        }
    };

    useEffect(() => {
        if (!selectedDate) return;
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        fetch(
            `http://localhost:8080/api/bookings/doctor/appointments?ngayKham=${selectedDate}`,
            { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const mapped = data.data.map((item) => ({
                        id: item.datLichID,
                        tenKhachHang: item.tenBenhNhan,
                        ngayKham: item.ngayKham,
                        gioBatDau: item.gioKham,
                        trangThai: mapTrangThai(item.trangThai),
                    }));
                    setBookings(mapped);
                } else setBookings([]);
            })
            .catch((err) => console.error("Lỗi lấy lịch:", err));
    }, [selectedDate]);

    const handleAction = async (id, action, reason = "") => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        let body = {};
        if (action === "confirm") {
            body = { datLichID: id, duyet: true, approve: true, reject: false, lyDoTuChoi: "" };
        } else if (action === "reject") {
            body = { datLichID: id, duyet: false, approve: false, reject: true, lyDoTuChoi: reason };
        }

        try {
            const res = await fetch(`http://localhost:8080/api/bookings/doctor/confirm/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(`${action === "confirm" ? "Xác nhận" : "Từ chối"} thất bại`);

            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, trangThai: action === "confirm" ? "DaXacNhan" : "DaHuy" } : b))
            );
            alert(`${action === "confirm" ? "Xác nhận" : "Từ chối"} lịch hẹn thành công!`);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const openRejectModal = (id) => {
        setCurrentRejectId(id);
        setRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setRejectModalOpen(false);
        setCurrentRejectId(null);
    };

    const submitReject = (reason) => {
        if (!currentRejectId) return;
        handleAction(currentRejectId, "reject", reason);
        closeRejectModal();
    };

    return (
        <div className="p-4 md:p-6 min-h-[300px] border border-gray-300 rounded-2xl shadow-sm bg-white">
            <div className="mb-5">
                <select
                    className="border border-gray-400 p-2 rounded-lg text-gray-700"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">-- Chọn ngày --</option>
                    {getNext6Days().map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            <BookingTable
                bookings={bookings}
                onConfirm={(id) => handleAction(id, "confirm")}
                onReject={(id) => openRejectModal(id)}
            />

            <RejectModal isOpen={rejectModalOpen} onClose={closeRejectModal} onSubmit={submitReject} />
        </div>
    );
};

export default DoctorBookingPage;
