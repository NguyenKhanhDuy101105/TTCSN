// DoctorViewModal.jsx
import React from "react";

export default function DoctorViewModal({ item, specialties, onClose, onEdit }) {
    const doctorSpecialties = item.specialtyIds
        .map((id) => specialties.find((s) => s.id === id)?.name)
        .filter(Boolean);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px] animate-[fadeIn_0.25s_ease]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Chi tiết bác sĩ
                </h2>

                <div className="space-y-3 text-gray-700 mb-6">
                    <p><b>Tên bác sĩ:</b> {item.name}</p>
                    <p><b>Chuyên khoa:</b> {doctorSpecialties.join(", ") || "Chưa có"}</p>
                    <p><b>Ca làm việc:</b> {item.shift}</p>
                    <p><b>Số điện thoại:</b> {item.phoneNumber}</p>
                    <p><b>Trạng thái:</b> {item.status}</p>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition shadow-sm"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => { onClose(); onEdit(item); }}
                        className="px-5 py-2.5 bg-[#ad7555] hover:bg-[#945f46] text-white rounded-xl transition shadow-sm"
                    >
                        Sửa thông tin
                    </button>
                </div>
            </div>
        </div>
    );
}
