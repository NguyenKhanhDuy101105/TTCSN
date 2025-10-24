import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { data as medicalData } from "../CoSoYTe/MedicalData";
import { specialties } from "../ChuyenKhoa/SpecialtiesData";

// Validation bằng Yup
const DoctorSchema = Yup.object().shape({
    name: Yup.string().required("Tên bác sĩ không được để trống"),
    medicalId: Yup.number().required("Vui lòng chọn cơ sở y tế"),
    specialtyId: Yup.string().required("Vui lòng chọn chuyên khoa"),
    desc: Yup.string()
        .max(1000, "Mô tả không được vượt quá 1000 ký tự")
        .required("Mô tả không được để trống"),
    schedule: Yup.string().required("Vui lòng nhập lịch làm việc"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
    status: Yup.string().required("Vui lòng chọn trạng thái"),
});

export default function DoctorsForm({ editingDoctor, onSave, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[fadeIn_0.25s_ease] max-h-[90vh] flex flex-col">

                <h2 className="text-xl md:text-2xl font-semibold p-6 pb-2 text-gray-800 text-center">
                    {editingDoctor ? "Sửa thông tin bác sĩ" : "Thêm bác sĩ"}
                </h2>

                {/* Nội dung scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Formik
                        initialValues={
                            editingDoctor
                                ? {
                                    name: editingDoctor.name || "",
                                    medicalId: editingDoctor.medicalId || "",
                                    specialtyId: editingDoctor.specialtyId || "",
                                    desc: editingDoctor.desc || "",
                                    schedule: editingDoctor.schedule || "",
                                    phoneNumber: editingDoctor.phoneNumber || "",
                                    status: editingDoctor.status || "active",
                                }
                                : {
                                    name: "",
                                    medicalId: "",
                                    specialtyId: "",
                                    desc: "",
                                    schedule: "",
                                    phoneNumber: "",
                                    status: "active",
                                }
                        }
                        validationSchema={DoctorSchema}
                        onSubmit={(values) => {
                            onSave(values);
                        }}
                        enableReinitialize
                    >
                        {({ values }) => {
                            const filteredSpecialties = specialties.filter(
                                (s) => s.medicalId === Number(values.medicalId)
                            );

                            return (
                                <Form className="space-y-5">
                                    {/* Họ tên bác sĩ */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Họ tên bác sĩ
                                        </label>
                                        <Field
                                            name="name"
                                            placeholder="Nhập tên bác sĩ"
                                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Cơ sở y tế */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Cơ sở y tế
                                        </label>
                                        <Field
                                            as="select"
                                            name="medicalId"
                                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition bg-white"
                                        >
                                            <option value="">-- Chọn cơ sở y tế --</option>
                                            {medicalData.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="medicalId"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Chuyên khoa */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Chuyên khoa
                                        </label>
                                        <Field
                                            as="select"
                                            name="specialtyId"
                                            disabled={!values.medicalId}
                                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition bg-white"
                                        >
                                            <option value="">-- Chọn chuyên khoa --</option>
                                            {filteredSpecialties.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="specialtyId"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Mô tả */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Mô tả
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="desc"
                                            rows="4"
                                            placeholder="Nhập mô tả (tối đa 1000 ký tự)"
                                            maxLength={1000}
                                            className="border border-gray-200 p-3 w-full rounded-xl resize-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                                            <ErrorMessage
                                                name="desc"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                            <span>{values.desc.length}/1000</span>
                                        </div>
                                    </div>

                                    {/* Lịch làm việc */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Lịch làm việc
                                        </label>
                                        <Field
                                            name="schedule"
                                            placeholder="VD: Thứ 2 - Thứ 6, 8:00 - 17:00"
                                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                        />
                                        <ErrorMessage
                                            name="schedule"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Số điện thoại */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Số điện thoại
                                        </label>
                                        <Field
                                            name="phoneNumber"
                                            placeholder="Nhập số điện thoại"
                                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                        />
                                        <ErrorMessage
                                            name="phoneNumber"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    {/* Trạng thái */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Trạng thái
                                        </label>
                                        <Field
                                            as="select"
                                            name="status"
                                            className="border border-gray-200 p-3 w-full rounded-xl bg-white focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                        >
                                            <option value="active">Hoạt động</option>
                                            <option value="inactive">Ngưng</option>
                                        </Field>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>

                {/* Footer (không scroll) */}
                <div className="flex justify-end gap-3 p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        form="doctor-form"
                        className="px-4 py-2 bg-[#ad7555] text-white rounded-xl shadow-md hover:bg-[#945f46] hover:scale-105 transition"
                    >
                        {editingDoctor ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>
            </div>
        </div>
    );
}

