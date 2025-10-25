import React, { useState } from "react";
import Toolbar from "./Toolbar";
import MedicalTableWithPagination from "./MedicalTableWithPagination.jsx";
import MedicalForm from "./MedicalForm.jsx";
import MedicalViewModal from "./MedicalViewModal.jsx";
import DeleteMedicalModal from "./DeleteMedicalModal.jsx";
import { data } from "./MedicalData.js";

const MedicalPage = () => {
    const [medicalData, setMedicalData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");

    // state quản lý modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // --- Tìm kiếm ---
    const filteredData = medicalData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address.toLowerCase().includes(searchTerm.toLowerCase())
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
        setMedicalData((prev) => prev.filter((m) => m.id !== selectedItem.id));
        setOpenDelete(false);
        setSelectedItem(null);
    };

    // --- Lưu (thêm / sửa) ---
    const handleSave = (newItem) => {
        if (selectedItem) {
            // sửa
            setMedicalData((prev) =>
                prev.map((m) => (m.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : m))
            );
        } else {
            // thêm
            setMedicalData((prev) => [...prev, { ...newItem, id: Date.now() }]);
        }
        setOpenForm(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <Toolbar onSearch={setSearchTerm} onAdd={handleAdd} />

            <MedicalTableWithPagination
                items={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal xem chi tiết */}
            {openView && selectedItem && (
                <MedicalViewModal
                    item={selectedItem}
                    onClose={() => {
                        setOpenView(false);
                        setSelectedItem(null);
                    }}
                    onEdit={(item) => {
                        setOpenView(false);   // tắt modal chi tiết
                        setSelectedItem(item); // set item cần sửa
                        setOpenForm(true);     // mở modal form
                    }}
                />
            )}

            {/* Modal form thêm / sửa */}
            {openForm && (
                <MedicalForm
                    editingMedical={selectedItem}
                    onSave={handleSave}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            {/* Modal xác nhận xóa */}
            {openDelete && selectedItem && (
                <DeleteMedicalModal
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

export default MedicalPage;
