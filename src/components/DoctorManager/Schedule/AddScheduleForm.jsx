import React, { useState } from "react";

const AddScheduleForm = ({ onClose, selectedDate, setSchedules, editingSchedule }) => {
    const [formData, setFormData] = useState({
        ngayNghi: editingSchedule ? editingSchedule.ngayNghi : selectedDate,
        lyDo: editingSchedule ? editingSchedule.lyDo : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editingSchedule ? "PUT" : "POST";
        const url = editingSchedule
            ? `http://localhost:8080/api/ngaynghi/${editingSchedule.id}`
            : "http://localhost:8080/api/ngaynghi";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (editingSchedule) {
            setSchedules((prev) =>
                prev.map((s) => (s.id === result.id ? result : s))
            );
        } else {
            setSchedules((prev) => [...prev, result]);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 shadow-lg">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[380px]">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {editingSchedule ? "Chỉnh sửa ngày nghỉ" : "Xin nghỉ"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Ngày nghỉ */}
                    <label className="text-sm font-medium">
                        Ngày nghỉ:
                        <input
                            type="date"
                            name="ngayNghi"
                            value={formData.ngayNghi}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-full mt-1 text-gray-600"
                            required
                        />
                    </label>

                    {/* Lý do */}
                    <label className="text-sm font-medium">
                        Lý do xin nghỉ:
                        <textarea
                            name="lyDo"
                            value={formData.lyDo}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Nhập lý do..."
                            className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                            required
                        />
                    </label>

                    {/* Nút */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                            onClick={onClose}
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScheduleForm;
