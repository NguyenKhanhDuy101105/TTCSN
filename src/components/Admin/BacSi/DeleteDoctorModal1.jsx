// DeleteDoctorModal.jsx
import React from "react";

export default function DeleteDoctorModal({ item, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-[fadeIn_0.25s_ease]">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                    Xác nhận xóa
                </h2>
                <p className="text-gray-700 mb-6 text-center">
                    Bạn có chắc chắn muốn xóa bác sĩ <b>{item.name}</b> không?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 w-24"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg w-24"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}
