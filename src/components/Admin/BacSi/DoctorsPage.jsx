
import React, { useState } from "react";
import DoctorToolbar from "./DoctorToolbar.jsx";
import DoctorsTable from "./DoctorTable.jsx"
import DoctorFormModal from "./DoctorFormModal.jsx";
import DoctorViewModal from "./DoctorViewModal1.jsx";
import DeleteDoctorModal from "./DeleteDoctorModal.jsx";
import { doctors } from "./DoctorData.js";
import { specialties } from "../ChuyenKhoa/SpecialtiesData.js";

const DoctorsPage = () => {
    const [doctorsData, setDoctorsData] = useState(doctors);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");

    // modal state
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // filter bác sĩ theo search + chuyên khoa
    const filteredDoctors = doctorsData.filter(
        (d) =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedSpecialty || d.specialtyIds.includes(Number(selectedSpecialty)))
    );

    // thêm mới
    const handleAdd = () => {
        setSelectedItem(null);
        setOpenForm(true);
    };

    // xem chi tiết
    const handleView = (index) => {
        setSelectedItem(filteredDoctors[index]);
        setOpenView(true);
    };

    // sửa
    const handleEdit = (index) => {
        setSelectedItem(filteredDoctors[index]);
        setOpenForm(true);
    };

    // xóa
    const handleDelete = (index) => {
        setSelectedItem(filteredDoctors[index]);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setDoctorsData((prev) => prev.filter((d) => d.id !== selectedItem.id));
        setOpenDelete(false);
        setSelectedItem(null);
    };

    // lưu thêm / sửa
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
            <DoctorToolbar
                onSearch={setSearchTerm}
                onAdd={handleAdd}
                content="bác sĩ"
                specialties={specialties}
                selectedSpecialty={selectedSpecialty}
                onSelectSpecialty={setSelectedSpecialty}
            />

            <DoctorsTable
                items={filteredDoctors.map((d) => ({
                    ...d,
                    specialtyNames: d.specialtyIds
                        .map((id) => specialties.find((s) => s.id === id)?.name)
                        .filter(Boolean),
                }))}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal xem chi tiết */}
            {openView && selectedItem && (
                <DoctorViewModal
                    item={selectedItem}
                    specialties={specialties}
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

            {/* Modal thêm / sửa */}
            {openForm && (
                <DoctorFormModal
                    editingDoctor={selectedItem}
                    specialties={specialties}
                    onSave={handleSave}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            {/* Modal xóa */}
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
