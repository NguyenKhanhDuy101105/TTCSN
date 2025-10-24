import React from "react";
import { data as medicalData } from "../CoSoYTe/MedicalData"; // import danh sách cơ sở y tế

export default function SpecialtiesViewModal({ item, onClose, onEdit }) {

    const hospital = medicalData.find((i) => i.id === item.medicalId);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px] animate-[fadeIn_0.25s_ease]">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Chi tiết chuyên khoa
                </h2>

                {/* Thông tin chuyên khoa */}
                <div className="space-y-3 text-gray-700 mb-6">
                    <p>
                        <b>Mã chuyên khoa:</b> {item.id}
                    </p>
                    <p>
                        <b>Tên chuyên khoa:</b> {item.name}
                    </p>
                    <p>
                        <b>Mô tả:</b> {item.desc}
                    </p>
                </div>

                {/* Thông tin cơ sở y tế */}
                {hospital && (
                    <div className="border-t pt-4 mt-4 text-gray-700">
                        <h3 className="text-lg font-semibold mb-3">Thuộc cơ sở y tế</h3>
                        <p>
                            <b>Tên cơ sở y tế:</b> {hospital.name}
                        </p>
                        <p>
                            <b>Địa chỉ:</b> {hospital.address}
                        </p>
                        <p>
                            <b>Số điện thoại:</b> {hospital.phoneNumber}
                        </p>
                        <p>
                            <b>Số bác sĩ:</b> {hospital.doctorCount}
                        </p>
                    </div>
                )}

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
