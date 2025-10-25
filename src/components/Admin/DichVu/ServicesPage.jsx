import React, { useState } from "react";
import Toolbar from "../ChuyenKhoa/Toolbar.jsx";
import ServicesTableWithPagination from "./ServicesTableWithPagination.jsx";
import ServicesForm from "./ServicesForm.jsx";
import ServicesViewModal from "./ServicesViewModal.jsx";
import DeleteServiceModal from "./DeleteServicesModal.jsx";

import { services } from "./ServicesData.js";
import { specialties } from "../ChuyenKhoa/SpecialtiesData.js";

const ServicesPage = () => {
    const [servicesData, setServicesData] = useState(services);
    const [searchTerm, setSearchTerm] = useState("");

    // state modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // --- Join dữ liệu chuyên khoa ---
    const joinedData = servicesData.map((item) => {
        const specialty = specialties.find((s) => s.id === item.specialtyId);
        return {
            ...item,
            specialty: specialty || null,
        };
    });

    // --- Tìm kiếm ---
    const filteredData = joinedData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.specialty?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        setServicesData((prev) => prev.filter((s) => s.id !== selectedItem.id));
        setOpenDelete(false);
        setSelectedItem(null);
    };

    // --- Lưu (thêm / sửa) ---
    const handleSave = (newItem) => {
        if (selectedItem) {
            // sửa
            setServicesData((prev) =>
                prev.map((s) => (s.id === selectedItem.id ? { ...newItem, id: selectedItem.id } : s))
            );
        } else {
            // thêm
            setServicesData((prev) => [...prev, { ...newItem, id: Date.now() }]);
        }
        setOpenForm(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <Toolbar onSearch={setSearchTerm} onAdd={handleAdd} content={"dịch vụ"} />

            <ServicesTableWithPagination
                items={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal xem chi tiết */}
            {openView && selectedItem && (
                <ServicesViewModal
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
                <ServicesForm
                    editingService={selectedItem}
                    onSave={handleSave}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            {/* Modal xác nhận xóa */}
            {openDelete && selectedItem && (
                <DeleteServiceModal
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

export default ServicesPage;
