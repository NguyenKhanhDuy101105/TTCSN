import React, { useState } from "react";
import Toolbar from "../ChuyenKhoa/Toolbar.jsx";
import SpecialtiesTableWithPagination from "../ChuyenKhoa/SpecialtiesTableWithPagination.jsx";
import SpecialtiesForm from "../ChuyenKhoa/SpecialtiesForm.jsx";
import SpecialtiesViewModal from "../ChuyenKhoa/SpecialtiesViewModal.jsx";
import DeleteSpecialtyModal from "../ChuyenKhoa/DeleteSpecialtyModal.jsx";
import { specialties } from "./SpecialtiesData.js"; // dữ liệu chuyên khoa
import { data as medicalData } from "../CoSoYTe/MedicalData.js"; // dữ liệu cơ sở y tế

const SpecialtiesPage = () => {
    const [specialtiesData, setSpecialtiesData] = useState(specialties);
    const [searchTerm, setSearchTerm] = useState("");

    // state quản lý modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // --- Join dữ liệu chuyên khoa với cơ sở y tế ---
    const joinedData = specialtiesData.map((item) => {
        const medical = medicalData.find((m) => m.id === item.medicalId);
        return {
            ...item,
            medical: medical || null, // gắn object đầy đủ để hiển thị
        };
    });

    // --- Tìm kiếm ---
    const filteredData = joinedData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        setSpecialtiesData((prev) => prev.filter((s) => s.id !== selectedItem.id));
        setOpenDelete(false);
        setSelectedItem(null);
    };

    // --- Lưu (thêm / sửa) ---
    const handleSave = (newItem) => {
        if (selectedItem) {
            // sửa
            setSpecialtiesData((prev) =>
                prev.map((s) => (s.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : s))
            );
        } else {
            // thêm
            setSpecialtiesData((prev) => [...prev, { ...newItem, id: Date.now() }]);
        }
        setOpenForm(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <Toolbar onSearch={setSearchTerm} onAdd={handleAdd} content={"chuyên khoa"} />

            <SpecialtiesTableWithPagination
                items={filteredData}   // bảng có đủ cả medical info
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal xem chi tiết */}
            {openView && selectedItem && (
                <SpecialtiesViewModal
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
                <SpecialtiesForm
                    editingSpecialty={selectedItem}
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
                <DeleteSpecialtyModal
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

export default SpecialtiesPage;
