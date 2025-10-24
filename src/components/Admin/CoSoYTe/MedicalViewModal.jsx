import React from "react";

export default function MedicalViewModal({ item, onClose, onEdit }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px] animate-[fadeIn_0.25s_ease]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Chi tiết cơ sở y tế
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        <b>Tên cơ sở y tế:</b> {item.name}
                    </p>
                    <p>
                        <b>Địa chỉ:</b> {item.address}
                    </p>
                    <p>
                        <b>Số điện thoại:</b> {item.phoneNumber}
                    </p>
                    <p>
                        <b>Số bác sĩ:</b> {item.doctorCount}
                    </p>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition shadow-sm"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => {
                            onClose(); // đóng modal chi tiết
                            onEdit(item); // mở modal sửa
                        }}
                        className="px-5 py-2.5 bg-[#ad7555] hover:bg-[#945f46] text-white rounded-xl transition shadow-sm"
                    >
                        Sửa thông tin
                    </button>
                </div>
            </div>
        </div>
    );
}