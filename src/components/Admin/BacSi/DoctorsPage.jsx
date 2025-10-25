import React, { useState } from "react";
import Toolbar from "../ChuyenKhoa/Toolbar.jsx"; // dùng lại Toolbar
import DoctorsTableWithPagination from "./DoctorsTableWithPagination.jsx";
import DoctorsForm from "./DoctorsForm.jsx";
import DoctorsViewModal from "./DoctorsViewModal.jsx";
import DeleteDoctorModal from "./DeleteDoctorModal.jsx";

import { doctors } from "./DoctorData.js"; // dữ liệu bác sĩ
import { specialties } from "../ChuyenKhoa/SpecialtiesData.js"; // dữ liệu chuyên khoa
import { data as medicalData } from "../CoSoYTe/MedicalData.js"; // dữ liệu cơ sở y tế

const DoctorsPage = () => {
    const [doctorsData, setDoctorsData] = useState(doctors);
    const [searchTerm, setSearchTerm] = useState("");

    // state modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // --- Join dữ liệu ---
    const joinedData = doctorsData.map((item) => {
        const specialty = specialties.find((s) => s.id === item.specialty?.id || s.id === item.specialtyId);
        const medical = medicalData.find((m) => m.id === item.medical?.id || m.id === item.medicalId);
        return {
            ...item,
            specialty: specialty || item.specialty || null,
            medical: medical || item.medical || null,
        };
    });

    // --- Tìm kiếm ---
    const filteredData = joinedData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.specialty?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.medical?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Thêm mới ---
    const handleAdd = () => {
        setSelectedItem(null);
        setOpenForm(true);
    };

    // --- Xem chi tiết ---
    const handleView = (index) => {
        setSelectedItem(filteredData[index]);
        setOpenView(true);
    };

    // --- Sửa ---
    const handleEdit = (index) => {
        setSelectedItem(filteredData[index]);
        setOpenForm(true);
    };

    // --- Xóa ---
    const handleDelete = (index) => {
        setSelectedItem(filteredData[index]);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setDoctorsData((prev) => prev.filter((d) => d.id !== selectedItem.id));
        setOpenDelete(false);
        setSelectedItem(null);
    };

    // --- Lưu (thêm / sửa) ---
    const handleSave = (newItem) => {
        if (selectedItem) {
            // sửa
            setDoctorsData((prev) =>
                prev.map((d) => (d.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : d))
            );
        } else {
            // thêm
            setDoctorsData((prev) => [...prev, { ...newItem, id: Date.now() }]);
        }
        setOpenForm(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <Toolbar onSearch={setSearchTerm} onAdd={handleAdd} content={"bác sĩ"} />

            <DoctorsTableWithPagination
                items={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal xem chi tiết */}
            {openView && selectedItem && (
                <DoctorsViewModal
                    item={selectedItem}
                    onClose={() => {
                        setOpenView(false);
                        setSelectedItem(null);
                    }}
                    onEdit={(item) => {
                        setOpenView(false);
                        setSelectedItem(item);
                        setOpenForm(true);
                    }}
                />
            )}

            {/* Modal form thêm / sửa */}
            {openForm && (
                <DoctorsForm
                    editingDoctor={selectedItem}
                    specialtyOptions={specialties}
                    medicalOptions={medicalData}
                    onSave={handleSave}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            {/* Modal xác nhận xóa */}
            {openDelete && selectedItem && (
                <DeleteDoctorModal
                    item={selectedItem}
                    onCancel={() => {
                        setOpenDelete(false);
                        setSelectedItem(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default DoctorsPage;
