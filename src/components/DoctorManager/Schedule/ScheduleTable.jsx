import React from "react";

const ScheduleTable = ({ schedules, onEdit, onDelete }) => {
    if (!schedules || schedules.length === 0)
        return <p className="text-center text-gray-500 mt-6">Không có ca khám nào</p>;

    return (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="w-full border-collapse">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="p-3 text-left">Ngày khám</th>
                        <th className="p-3 text-left">Giờ bắt đầu</th>
                        <th className="p-3 text-left">Giờ kết thúc</th>
                        <th className="p-3 text-left">Trạng thái</th>
                        <th className="p-3 text-center">Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {schedules.map((s) => (
                        <tr key={s.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{s.ngayKham}</td>
                            <td className="p-3">{s.gioBatDau}</td>
                            <td className="p-3">{s.gioKetThuc}</td>
                            <td className="p-3">
                                {s.trangThai === "Đã đặt" ? (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                        Đã đặt
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        Trống
                                    </span>
                                )}
                            </td>

                            <td className="p-3 text-center space-x-2">
                                <button
                                    onClick={() => onEdit(s)}
                                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                                >
                                    Sửa
                                </button>

                                <button
                                    onClick={() => onDelete(s.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
