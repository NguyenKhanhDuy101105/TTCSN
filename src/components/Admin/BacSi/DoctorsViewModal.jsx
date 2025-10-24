import React from "react";
import { specialties } from "../ChuyenKhoa/SpecialtiesData";
import { data as medicalData } from "../CoSoYTe/MedicalData";

export default function DoctorsViewModal({ item, onClose, onEdit }) {
    const specialty = specialties.find((s) => s.id === item.specialtyId);
    const hospital = medicalData.find((m) => m.id === item.medicalId);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px] animate-[fadeIn_0.25s_ease]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Chi tiết bác sĩ
                </h2>

                {/* Thông tin bác sĩ */}
                <div className="space-y-3 text-gray-700 mb-6">
                    <p>
                        <b>Mã bác sĩ:</b> {item.id}
                    </p>
                    <p>
                        <b>Họ tên:</b> {item.name}
                    </p>
                    <p>
                        <b>Mô tả:</b> {item.desc}
                    </p>
                    <p>
                        <b>Lịch làm việc:</b> {item.schedule}
                    </p>
                    <p>
                        <b>Số điện thoại:</b> {item.phoneNumber}
                    </p>
                    <p>
                        <b>Trạng thái:</b>{" "}
                        <span
                            className={`${item.status === "active" ? "text-green-600" : "text-red-600"
                                } font-medium`}
                        >
                            {item.status === "active" ? "Hoạt động" : "Ngưng"}
                        </span>
                    </p>
                    <p>
                        <b>Chuyên khoa:</b> {specialty ? specialty.name : "Không xác định"}
                    </p>
                    <p>
                        <b>Cơ sở y tế:</b> {hospital ? hospital.name : "Không xác định"}
                    </p>
                </div>

                {/* Nút */}
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
