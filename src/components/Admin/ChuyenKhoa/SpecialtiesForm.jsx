import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { data as medicalData } from "../CoSoYTe/MedicalData";

// Validation bằng Yup
const SpecialtySchema = Yup.object().shape({
    name: Yup.string().required("Tên chuyên khoa không được để trống"),
    medicalId: Yup.number().required("Vui lòng chọn cơ sở y tế"),
    desc: Yup.string()
        .max(1000, "Mô tả không được vượt quá 1000 ký tự")
        .required("Mô tả không được để trống"),
});

export default function SpecialtiesForm({ editingSpecialty, onSave, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md animate-[fadeIn_0.25s_ease]">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                    {editingSpecialty ? "Sửa chuyên khoa" : "Thêm chuyên khoa"}
                </h2>

                <Formik
                    initialValues={
                        editingSpecialty
                            ? {
                                name: editingSpecialty.name || "",
                                medicalId: editingSpecialty.medicalId || "",
                                desc: editingSpecialty.desc || "",
                            }
                            : { name: "", medicalId: "", desc: "" }
                    }
                    validationSchema={SpecialtySchema}
                    onSubmit={(values) => {
                        onSave(values);
                    }}
                    enableReinitialize
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {/* Tên chuyên khoa */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Tên chuyên khoa</label>
                                <Field
                                    name="name"
                                    placeholder="Nhập tên chuyên khoa"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Cơ sở y tế */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Cơ sở y tế</label>
                                <Field
                                    as="select"
                                    name="medicalId"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                >
                                    <option value="">-- Chọn cơ sở y tế --</option>
                                    {medicalData.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="medicalId" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Mô tả */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Mô tả</label>
                                <Field
                                    as="textarea"
                                    name="desc"
                                    placeholder="Nhập mô tả chuyên khoa (tối đa 1000 ký tự)"
                                    rows="5"
                                    className="border border-gray-200 p-3 w-full rounded-xl resize-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                    maxLength={1000}
                                    onChange={(e) => setFieldValue("desc", e.target.value)}
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                    <ErrorMessage name="desc" component="div" className="text-red-500 text-sm" />
                                    <span className="ml-auto">{values.desc.length}/1000</span>
                                </div>
                            </div>

                            {/* Nút */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#ad7555] text-white rounded-xl shadow-md hover:bg-[#945f46] hover:scale-105 transition"
                                >
                                    {editingSpecialty ? "Cập nhật" : "Thêm mới"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
