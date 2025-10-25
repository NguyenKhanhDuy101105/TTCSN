import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { specialties } from "../ChuyenKhoa/SpecialtiesData";

// Validation bằng Yup
const ServiceSchema = Yup.object().shape({
    name: Yup.string().required("Tên dịch vụ không được để trống"),
    price: Yup.number()
        .typeError("Giá phải là số")
        .positive("Giá phải lớn hơn 0")
        .required("Vui lòng nhập giá dịch vụ"),
    duration: Yup.number()
        .typeError("Thời gian phải là số")
        .positive("Thời gian phải lớn hơn 0")
        .required("Vui lòng nhập thời gian khám"),
    specialtyId: Yup.string().required("Vui lòng chọn chuyên khoa"),
});

export default function ServicesForm({ editingService, onSave, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[fadeIn_0.25s_ease] max-h-[90vh] flex flex-col">
                <h2 className="text-xl md:text-2xl font-semibold p-6 pb-2 text-gray-800 text-center">
                    {editingService ? "Sửa dịch vụ khám" : "Thêm dịch vụ khám"}
                </h2>

                <div className="flex-1 overflow-y-auto p-6">
                    <Formik
                        initialValues={{
                            name: editingService?.name || "",
                            price: editingService?.price || "",
                            duration: editingService?.duration || "",
                            specialtyId: editingService?.specialtyId || "",
                        }}
                        validationSchema={ServiceSchema}
                        onSubmit={(values) => onSave(values)}
                        enableReinitialize
                    >
                        {({ handleSubmit }) => (
                            <Form id="service-form" onSubmit={handleSubmit} className="space-y-5">
                                {/* Tên dịch vụ */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Tên dịch vụ
                                    </label>
                                    <Field
                                        name="name"
                                        placeholder="Nhập tên dịch vụ"
                                        className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Giá */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Giá (VNĐ)
                                    </label>
                                    <Field
                                        name="price"
                                        type="number"
                                        placeholder="Nhập giá dịch vụ"
                                        className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Thời gian khám */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Thời gian khám (phút)
                                    </label>
                                    <Field
                                        name="duration"
                                        type="number"
                                        placeholder="Nhập thời gian khám"
                                        className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                    />
                                    <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Chuyên khoa */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Chuyên khoa
                                    </label>
                                    <Field
                                        as="select"
                                        name="specialtyId"
                                        className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition bg-white"
                                    >
                                        <option value="">-- Chọn chuyên khoa --</option>
                                        {specialties.map((s) => (
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
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* Footer */}
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
                        form="service-form"
                        className="px-4 py-2 bg-[#ad7555] text-white rounded-xl shadow-md hover:bg-[#945f46] hover:scale-105 transition"
                    >
                        {editingService ? "Cập nhật" : "Thêm mới"}
                    </button>
                </div>
            </div>
        </div>
    );
}
