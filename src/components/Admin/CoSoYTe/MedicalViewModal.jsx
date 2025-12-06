import React from "react";

export default function MedicalViewModal({ item, onClose, onEdit }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px] animate-[fadeIn_0.25s_ease]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Chi tiết cơ sở y tế
                </h2>

                {/* Ảnh đại diện */}
                {item.anhDaiDien && (
                    <div className="mb-4">
                        <img
                            src={item.anhDaiDien}
                            alt="Ảnh cơ sở"
                            className="w-full rounded-xl border shadow-sm"
                        />
                    </div>
                )}

                {/* Thông tin cơ sở y tế */}
                <div className="space-y-3 text-gray-700 mb-6">
                    <p>
                        <b>Tên cơ sở:</b> {item.tenCoSo}
                    </p>
                    <p>
                        <b>Địa chỉ:</b> {item.diaChi}
                    </p>
                    <p>
                        <b>Số điện thoại:</b> {item.soDienThoai}
                    </p>
                    <p>
                        <b>Email:</b> {item.email}
                    </p>
                    <p>
                        <b>Mô tả:</b> {item.moTa}
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
                            onClose();
                            onEdit(item);
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
