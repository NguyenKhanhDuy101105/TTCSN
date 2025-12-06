import React from "react";

const BookingTable = ({ bookings, onConfirm }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-300 shadow-md">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b border-r border-gray-300 text-center">Tên khách hàng</th>
                        <th className="p-3 border-b border-r border-gray-300 text-center">Ngày khám</th>
                        <th className="p-3 border-b border-r border-gray-300 text-center">Giờ bắt đầu</th>
                        <th className="p-3 border-b border-r border-gray-300 text-center">Giờ kết thúc</th>
                        <th className="p-3 border-b border-r border-gray-300 text-center">Trạng thái</th>
                        <th className="p-3 border-b text-center border-gray-300">Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-500">
                                Không có lịch đặt nào
                            </td>
                        </tr>
                    ) : (
                        bookings.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-50 transition border-b"
                            >
                                <td className="p-3">{item.tenKhachHang}</td>
                                <td className="p-3">{item.ngayKham}</td>
                                <td className="p-3">{item.gioBatDau.slice(0, 5)}</td>
                                <td className="p-3">{item.gioKetThuc.slice(0, 5)}</td>

                                <td className="p-3 font-semibold">
                                    {item.trangThai === "ChoXacNhan" && (
                                        <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg">
                                            Chờ xác nhận
                                        </span>
                                    )}
                                    {item.trangThai === "DaXacNhan" && (
                                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                                            Đã xác nhận
                                        </span>
                                    )}
                                    {item.trangThai === "DaHuy" && (
                                        <span className="text-red-700 bg-red-100 px-2 py-1 rounded-lg">
                                            Đã hủy
                                        </span>
                                    )}
                                </td>

                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => onConfirm(item.id)}
                                        disabled={item.trangThai !== "ChoXacNhan"}
                                        className={`px-3 py-1 rounded-lg text-white text-sm font-medium shadow
                                            ${item.trangThai !== "ChoXacNhan"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700"
                                            }
                                        `}
                                    >
                                        Xác nhận
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
