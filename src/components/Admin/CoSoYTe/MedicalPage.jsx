import React, { useState } from "react";
import { Eye, Edit } from "lucide-react";
import MedicalForm from "./MedicalForm.jsx";
import MedicalViewModal from "./MedicalViewModal.jsx";

const MedicalPage = () => {
    const [medicalData, setMedicalData] = useState({
        tenCoSo: "",
        diaChi: "",
        soDienThoai: "",
        email: "",
        moTa: "",
        anhDaiDien: "",
    });

    const [openView, setOpenView] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Bảng hiển thị */}
            <table className="w-full bg-white">
                <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                    <tr>
                        <th className="p-4 ">Tên cơ sở</th>
                        <th className="p-4 ">Địa chỉ</th>
                        <th className="p-4">Số điện thoại</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-center">Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="hover:bg-[#fdf8f5] transition">
                        <td className="p-4 font-medium">{medicalData.tenCoSo}</td>
                        <td className="p-4">{medicalData.diaChi}</td>
                        <td className="p-4">{medicalData.soDienThoai}</td>
                        <td className="p-4">{medicalData.email}</td>

                        <td className="p-4 text-center">
                            <div className="flex justify-center gap-3">

                                <button
                                    onClick={() => setOpenView(true)}
                                    className="text-blue-500 hover:text-sky-700 transition"
                                >
                                    <Eye size={18} />
                                </button>

                                <button
                                    onClick={() => setOpenForm(true)}
                                    className="text-[#ad7555] hover:text-[#945f46] transition"
                                >
                                    <Edit size={18} />
                                </button>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Modal xem chi tiết */}
            {openView && (
                <MedicalViewModal
                    item={medicalData}
                    onClose={() => setOpenView(false)}
                    onEdit={() => {
                        setOpenView(false);
                        setOpenForm(true);
                    }}
                />
            )}

            {/* Modal sửa */}
            {openForm && (
                <MedicalForm
                    editingMedical={medicalData}
                    onSave={(newData) => {
                        setMedicalData(newData);
                        setOpenForm(false);
                    }}
                    onClose={() => setOpenForm(false)}
                />
            )}
        </div>
    );
};

export default MedicalPage;
