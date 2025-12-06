import React, { useState, useEffect } from "react";
import AddScheduleForm from "./AddScheduleForm";
import ScheduleTable from "./ScheduleTable";

const SchedulePage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            fetch(`http://localhost:8080/api/lichkham?date=${selectedDate}`)
                .then((res) => res.json())
                .then((data) => setSchedules(data))
                .catch(console.error);
        }
    }, [selectedDate]);

    const handleAdd = () => {
        setEditingSchedule(null);
        setShowForm(true);
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa ca khám này không?")) {
            await fetch(`http://localhost:8080/api/lichkham/${id}`, {
                method: "DELETE",
            });
            setSchedules((prev) => prev.filter((s) => s.id !== id));
        }
    };

    return (
        <div className="p-6 min-h-[300px] border border-gray-300 rounded-2xl shadow-sm mb-5">
            {/* Bộ lọc + nút */}
            <div className="flex justify-between items-center mb-4 ">
                <input
                    type="date"
                    className="border rounded-lg p-2 border-gray-400"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    + Xin nghỉ
                </button>
            </div>

            {/* Bảng */}
            <ScheduleTable
                schedules={schedules}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Popup form */}
            {showForm && (
                <AddScheduleForm
                    onClose={() => setShowForm(false)}
                    selectedDate={selectedDate}
                    setSchedules={setSchedules}
                    editingSchedule={editingSchedule}
                />
            )}
        </div>
    );
};

export default SchedulePage;
