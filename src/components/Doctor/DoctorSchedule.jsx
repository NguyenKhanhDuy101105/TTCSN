import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const DoctorSchedule = ({ schedule, doctor }) => {
    console.log(doctor)
    const nextDays = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            value: date.toISOString().split("T")[0],
            label: date.toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
            }),
        };
    });

    const [selectedDate, setSelectedDate] = useState(nextDays[0].value);
    const navigate = useNavigate();
    const handleSelectSlot = (slot) => {
        if (!slot.available) return;
        console.log("Doctor gửi sang đặt lịch:", doctor);
        console.log("Ngày đã chọn:", selectedDate);
        console.log("Khung giờ đã chọn:", slot.time);
        navigate("/dat-lich", {
            state: {
                doctor,
                date: selectedDate,
                time: slot.time,
            },
        });
    };
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">LỊCH KHÁM</h3>
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-sky-400"
                >
                    {nextDays.map((day) => (
                        <option key={day.value} value={day.value}>
                            {day.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
                {schedule.slots.map((slot, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectSlot(slot)}
                        disabled={!slot.available}
                        className={`border border-gray-300 rounded p-2 text-sm ${slot.available
                            ? "hover:bg-sky-100"
                            : "bg-gray-100 cursor-not-allowed"
                            }`}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>

            <p className="text-gray-500 text-sm mb-2">
                Chọn và đặt (Phí đặt lịch: {schedule.bookingFee}đ)
            </p>
        </>
    );
};

export default DoctorSchedule;
