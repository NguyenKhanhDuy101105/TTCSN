import React, { useState, useEffect } from "react";
import DoctorToolbar from "./DoctorToolbar.jsx";
import DoctorsTable from "./DoctorTable.jsx";
import DoctorFormModal from "./DoctorFormModal.jsx";
import DoctorCreateForm from "./DoctorCreateForm.jsx";
import DoctorsViewModal from "./DoctorsViewModal1.jsx";
import DeleteDoctorModal from "./DeleteDoctorModal.jsx";
import {
    fetchDoctors,
    deleteDoctor,
    updateDoctor,
    restoreDoctor,
    fetchSpecialties,
    fetchDegrees,
    fetchDoctorById
} from "./adminBacSiAPI.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorsPage = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedItem, setSelectedItem] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);


    const loadDoctors = async (pageNumber = 0) => {
        try {
            const res = await fetchDoctors({
                page: pageNumber,
                size: 7,
                sortBy: "nguoiDung.hoTen",
                direction: "asc"
            });
            setDoctorsData(res.content);
            setTotalPages(res.totalPages);
            setPage(res.number);
        } catch (error) {
            console.error(error.message);
            toast.error("Lấy danh sách bác sĩ thất bại!");
        }
    };


    const loadSpecialtiesAndDegrees = async () => {
        try {
            const [specs, degs] = await Promise.all([fetchSpecialties(), fetchDegrees()]);
            setSpecialties(specs);
            setDegrees(degs);
        } catch (error) {
            console.error(error.message);
            toast.error("Lấy dữ liệu chuyên khoa/trình độ thất bại!");
        }
    };

    useEffect(() => {
        loadDoctors();
        loadSpecialtiesAndDegrees();
    }, []);


    const filteredDoctors = doctorsData.filter(
        (d) =>
            d.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedSpecialty || d.chuyenKhoaID === Number(selectedSpecialty))
    );

    const handleView = (doctor) => {
        setSelectedItem(doctor);
        setOpenView(true);
    };

    const handleEdit = async (doctor) => {
        try {
            const details = await fetchDoctorById(doctor.bacSiID);
            setSelectedItem(details);
            setOpenForm(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Lấy chi tiết bác sĩ thất bại!");
        }
    };

    const handleDelete = (doctor) => {
        setSelectedItem(doctor);
        setOpenDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteDoctor(selectedItem.bacSiID);
            setDoctorsData(prev =>
                prev.map(d => d.bacSiID === selectedItem.bacSiID ? { ...d, deleted: true } : d)
            );
            setOpenDelete(false);
            setSelectedItem(null);
            toast.success("Xóa bác sĩ thành công!");
        } catch (error) {
            console.error(error.message);
            toast.error("Xóa bác sĩ thất bại!");
        }
    };

    const handleRestore = async (doctor) => {
        try {
            const restoredDoctor = await restoreDoctor(doctor.bacSiID);
            setDoctorsData(prev =>
                prev.map(d => d.bacSiID === doctor.bacSiID ? restoredDoctor : d)
            );
            toast.success("Khôi phục bác sĩ thành công!");
        } catch (error) {
            console.error(error.message);
            toast.error("Khôi phục bác sĩ thất bại!");
        }
    };

    const handleSave = async (updatedValues) => {
        try {
            const fullData = {
                nguoiDungID: selectedItem.bacSiID,
                chuyenKhoaID: updatedValues.chuyenKhoaID,
                trinhDoID: updatedValues.trinhDoID,
                trangThaiCongViec: updatedValues.trangThaiCongViec,
                soNamKinhNghiem: selectedItem.soNamKinhNghiem,
                gioiThieu: selectedItem.gioiThieu,
                quaTrinhDaoTao: selectedItem.quaTrinhDaoTao,
                kinhNghiemLamViec: selectedItem.kinhNghiemLamViec,
                thanhTich: selectedItem.thanhTich,
                chungChi: selectedItem.chungChi,
                soBenhNhanToiDaMotNgay: selectedItem.soBenhNhanToiDaMotNgay,
                thoiGianKhamMotCa: selectedItem.thoiGianKhamMotCa
            };

            const updatedDoctor = await updateDoctor(selectedItem.bacSiID, fullData);

            setDoctorsData(prev =>
                prev.map(d => d.bacSiID === selectedItem.bacSiID ? updatedDoctor : d)
            );

            setOpenForm(false);
            setSelectedItem(null);
            toast.success("Cập nhật bác sĩ thành công!");
        } catch (error) {
            console.error(error.message);
            toast.error("Cập nhật bác sĩ thất bại!");
        }
    };

    const handleAddDoctor = () => {
        setSelectedItem(null);
        setOpenCreate(true);
    };

    return (
        <div className="">
            <ToastContainer position="top-right" autoClose={2000} />

            <DoctorToolbar
                onSearch={setSearchTerm}
                onAdd={handleAddDoctor}
                content="bác sĩ"
                specialties={specialties}
                selectedSpecialty={selectedSpecialty}
                onSelectSpecialty={setSelectedSpecialty}
            />

            <DoctorsTable
                items={filteredDoctors.map(d => ({
                    ...d,
                    tenChuyenKhoa: specialties.length
                        ? specialties.find(s => Number(s.chuyenKhoaID) === Number(d.chuyenKhoaID))?.tenChuyenKhoa || "Không xác định"
                        : d.tenChuyenKhoa,
                    tenTrinhDo: degrees.length
                        ? degrees.find(t => Number(t.trinhDoID) === Number(d.trinhDoID))?.tenTrinhDo || "Không xác định"
                        : d.tenTrinhDo,
                    status: d.trangThaiCongViec ? "Hoạt động" : "Ngưng hoạt động"
                }))}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestore={handleRestore}
                page={page}
                setPage={loadDoctors}
                totalPages={totalPages}
            />

            {openView && selectedItem && (
                <DoctorsViewModal
                    item={selectedItem}
                    specialties={specialties}
                    degrees={degrees}
                    onClose={() => { setOpenView(false); setSelectedItem(null); }}
                    onEdit={(item) => { setOpenView(false); setSelectedItem(item); setOpenForm(true); }}
                />
            )}

            {openForm && selectedItem && (
                <DoctorFormModal
                    editingDoctor={selectedItem}
                    specialties={specialties}
                    trinhDoList={degrees}
                    onSave={handleSave}
                    onClose={() => { setOpenForm(false); setSelectedItem(null); }}
                />
            )}

            {openCreate && (
                <DoctorCreateForm
                    onClose={() => setOpenCreate(false)}
                    onCreated={() => { setOpenCreate(false); loadDoctors(); }}
                    specialties={specialties}
                    trinhDoList={degrees}
                />
            )}

            {openDelete && selectedItem && (
                <DeleteDoctorModal
                    item={selectedItem}
                    onCancel={() => { setOpenDelete(false); setSelectedItem(null); }}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default DoctorsPage;
