import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import MedicalForm from "./MedicalForm.jsx";
import MedicalViewModal from "./MedicalViewModal.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicalPage = () => {
    const [medicalData, setMedicalData] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch("http://localhost:8080/api/facilities/default", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Không thể tải dữ liệu");
                const data = await res.json();
                setMedicalData(data);
            } catch (error) {
                console.error(error);
                toast.error("Có lỗi xảy ra khi tải thông tin cơ sở y tế.");
            }
        };
        fetchData();
    }, []);

    if (!medicalData)
        return <p className="p-5 text-center">Đang tải dữ liệu...</p>;

    return (
        <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <ToastContainer position="top-right" autoClose={3000} />

            <table className="w-full bg-white">
                <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                    <tr>
                        <th className="p-4 border-r border-gray-300 text-center">Tên cơ sở</th>
                        <th className="p-4 border-r border-gray-300 text-center">Địa chỉ</th>
                        <th className="p-4 border-r border-gray-300 text-center">Số điện thoại</th>
                        <th className="p-4 border-r border-gray-300 text-center">Email</th>
                        <th className="p-4 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-[#fdf8f5] transition">
                        <td className="p-4 font-medium text-center border-r border-gray-300">{medicalData.tenCoSo}</td>
                        <td className="p-4 text-center border-r border-gray-300">{medicalData.diaChi}</td>
                        <td className="p-4 text-center border-r border-gray-300">{medicalData.soDienThoai}</td>
                        <td className="p-4 text-center border-r border-gray-300">{medicalData.email}</td>
                        <td className="p-4 text-center">
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setOpenView(true)}
                                    className="text-blue-500 hover:text-sky-700 transition cursor-pointer"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => setOpenForm(true)}
                                    className="text-[#ad7555] hover:text-[#945f46] transition cursor-pointer"
                                >
                                    <Edit size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

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

            {openForm && (
                <MedicalForm
                    editingMedical={medicalData}
                    onSave={(newData, error) => {
                        if (error) {
                            toast.error("Cập nhật thất bại!");
                        } else if (newData) {
                            setMedicalData(newData);
                            toast.success("Cập nhật cơ sở y tế thành công!");
                            setOpenForm(false);
                        }
                    }}
                    onClose={() => setOpenForm(false)}
                />
            )}
        </div>
    );
};

export default MedicalPage;
