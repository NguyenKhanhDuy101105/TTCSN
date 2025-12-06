import React, { useState, useEffect } from "react";
import Toolbar from "../ChuyenKhoa/Toolbar.jsx";
import SpecialtiesTableWithPagination from "../ChuyenKhoa/SpecialtiesTableWithPagination.jsx";
import SpecialtiesForm from "../ChuyenKhoa/SpecialtiesForm.jsx";
import SpecialtiesViewModal from "../ChuyenKhoa/SpecialtiesViewModal.jsx";
import DeleteSpecialtyModal from "../ChuyenKhoa/DeleteSpecialtyModal.jsx";
import {
    getAllSpecialties,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
} from "./chuyenkhoaAPI.js";

const SpecialtiesPage = () => {
    const [specialtiesData, setSpecialtiesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // state modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const token = localStorage.getItem("accessToken");
    // --- Lấy dữ liệu từ API khi component mount ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSpecialties();
                console.log(data)
                setSpecialtiesData(data);
            } catch (err) {
                console.error("Lỗi tải danh sách chuyên khoa:", err);
            }
        };
        fetchData();
    }, []);

    // --- Tìm kiếm ---
    const filteredData = specialtiesData.filter((item) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            item.tenChuyenKhoa.toLowerCase().includes(term) ||
            item.moTa.toLowerCase().includes(term)
        );
    });

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

    const confirmDelete = async () => {
        try {

            await deleteSpecialty(selectedItem.chuyenKhoaID, token);
            setSpecialtiesData((prev) =>
                prev.filter((s) => s.chuyenKhoaID !== selectedItem.chuyenKhoaID)
            );
        } catch (err) {
            console.error("Lỗi xóa chuyên khoa:", err);
        } finally {
            setOpenDelete(false);
            setSelectedItem(null);
        }
    };

    // --- Lưu (thêm / sửa) ---
    const handleSave = async (newItem) => {
        try {

            if (selectedItem) {
                // Sửa
                const updated = await updateSpecialty(
                    selectedItem.chuyenKhoaID,
                    newItem,
                    token,
                );
                setSpecialtiesData((prev) =>
                    prev.map((s) =>
                        s.chuyenKhoaID === selectedItem.chuyenKhoaID ? updated : s
                    )
                );
            } else {

                const created = await createSpecialty(newItem, token);
                setSpecialtiesData((prev) => [...prev, created]);
            }
        } catch (err) {
            console.error("Lỗi lưu chuyên khoa:", err);
        } finally {
            setOpenForm(false);
            setSelectedItem(null);
        }
    };

    return (
        <div>
            <Toolbar onSearch={setSearchTerm} onAdd={handleAdd} content={"chuyên khoa"} />

            <SpecialtiesTableWithPagination
                items={filteredData}
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
