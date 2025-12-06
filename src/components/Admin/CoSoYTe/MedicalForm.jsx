import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation
const MedicalSchema = Yup.object().shape({
    tenCoSo: Yup.string().required("Tên cơ sở không được để trống"),
    diaChi: Yup.string().required("Địa chỉ không được để trống"),
    soDienThoai: Yup.string()
        .matches(/^[0-9]+$/, "Chỉ được nhập số")
        .min(9, "Số điện thoại phải từ 9–11 số")
        .max(11, "Số điện thoại phải từ 9–11 số")
        .required("Không được để trống"),
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
    moTa: Yup.string()
        .max(1000, "Mô tả tối đa 1000 ký tự")
        .required("Mô tả không được để trống"),
    anhDaiDien: Yup.string(),
});

export default function MedicalForm({ editingMedical, onSave, onClose }) {

    const formik = useFormik({
        initialValues: editingMedical || {
            tenCoSo: "",
            diaChi: "",
            soDienThoai: "",
            email: "",
            moTa: "",
            anhDaiDien: "",
        },
        validationSchema: MedicalSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const response = await fetch("https://api.example.com/medical", {
                    method: editingMedical?.id ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (!response.ok) throw new Error(`Lỗi: ${response.status}`);

                const data = await response.json();
                console.log("API response:", data);
                onSave(data); // callback để cập nhật state ở component cha
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu:", error);
                alert("Có lỗi xảy ra khi gửi dữ liệu");
            }
        },
    });

    const { values, handleChange, handleSubmit, setFieldValue, errors, touched, handleBlur } = formik;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[fadeIn_0.25s_ease]">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Cập nhật thông tin
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Ảnh đại diện */}
                    <div className="mb-5 relative">
                        <label className="block text-gray-700 font-medium mb-1">Ảnh đại diện cơ sở</label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setFieldValue("anhDaiDien", reader.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="border border-gray-200 p-3 w-full rounded-xl bg-white focus:ring-1 focus:ring-gray-300 focus:border-gray-400 shadow-sm transition"
                        />
                        {values.anhDaiDien && (
                            <div className="relative w-24 h-24 mt-3">
                                <img src={values.anhDaiDien} alt="Preview" className="w-full h-full object-cover border shadow-sm rounded-md" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFieldValue("anhDaiDien", "");
                                        const input = document.getElementById("fileInput");
                                        if (input) input.value = "";
                                    }}
                                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tên cơ sở */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1">Tên cơ sở</label>
                        <input
                            name="tenCoSo"
                            value={values.tenCoSo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nhập tên cơ sở"
                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                        />
                        {touched.tenCoSo && errors.tenCoSo && <div className="text-red-500 text-sm mt-1">{errors.tenCoSo}</div>}
                    </div>

                    {/* Địa chỉ */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1">Địa chỉ</label>
                        <input
                            name="diaChi"
                            value={values.diaChi}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nhập địa chỉ"
                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                        />
                        {touched.diaChi && errors.diaChi && <div className="text-red-500 text-sm mt-1">{errors.diaChi}</div>}
                    </div>

                    {/* Số điện thoại */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                        <input
                            name="soDienThoai"
                            value={values.soDienThoai}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="VD: 0987654321"
                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                        />
                        {touched.soDienThoai && errors.soDienThoai && <div className="text-red-500 text-sm mt-1">{errors.soDienThoai}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1">Email cơ sở</label>
                        <input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="example@domain.com"
                            className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                        />
                        {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    {/* Mô tả */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1">Mô tả về cơ sở</label>
                        <textarea
                            name="moTa"
                            value={values.moTa}
                            onChange={(e) => setFieldValue("moTa", e.target.value)}
                            onBlur={handleBlur}
                            rows={5}
                            placeholder="Nhập mô tả, giới thiệu cơ sở"
                            className="border border-gray-200 p-3 w-full rounded-xl resize-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                            maxLength={1000}
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            {touched.moTa && errors.moTa && <div className="text-red-500">{errors.moTa}</div>}
                            <span>{values.moTa.length}/1000</span>
                        </div>
                    </div>

                    {/* Nút */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition">
                            Hủy
                        </button>
                        <button type="submit" className="px-4 py-2 bg-[#ad7555] text-white rounded-xl shadow-md hover:bg-[#945f46] hover:scale-105 transition">
                            Lưu
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
