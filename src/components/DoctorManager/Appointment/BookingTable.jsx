import React from "react";

const BookingTable = ({ bookings, onConfirm, onReject }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md">
            <table className="w-full min-w-[600px] border-collapse text-center">
                <thead>
                    <tr className="bg-gray-100 text-xs sm:text-sm">
                        <th className="p-2 sm:p-3 border border-gray-300">Tên khách hàng</th>
                        <th className="p-2 sm:p-3 border border-gray-300">Ngày khám</th>
                        <th className="p-2 sm:p-3 border border-gray-300">Giờ bắt đầu</th>
                        <th className="p-2 sm:p-3 border border-gray-300">Trạng thái</th>
                        <th className="p-2 sm:p-3 border border-gray-300">Thao tác</th>
                    </tr>
                </thead>

                <tbody className="text-xs sm:text-sm">
                    {bookings.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center p-4 text-gray-500 border border-gray-300"
                            >
                                Hôm nay không có lịch đặt nào
                            </td>
                        </tr>
                    ) : (
                        bookings.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="p-2 sm:p-3 border border-gray-300 whitespace-nowrap">
                                    {item.tenKhachHang}
                                </td>

                                <td className="p-2 sm:p-3 border border-gray-300 whitespace-nowrap">
                                    {item.ngayKham}
                                </td>

                                <td className="p-2 sm:p-3 border border-gray-300">
                                    {item.gioBatDau.slice(0, 5)}
                                </td>


                                <td className="p-2 sm:p-3 border border-gray-300">
                                    <span
                                        className={`px-2 py-1 rounded-md font-medium text-white text-[10px] sm:text-xs whitespace-nowrap ${item.trangThai === "DaXacNhan"
                                            ? "bg-green-600"
                                            : item.trangThai === "ChoXacNhan"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {item.trangThai === "DaXacNhan"
                                            ? "Đã xác nhận"
                                            : item.trangThai === "ChoXacNhan"
                                                ? "Chờ xác nhận"
                                                : "Đã từ chối"}
                                    </span>
                                </td>


                                <td className="p-2 sm:p-3 border border-gray-300">
                                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                                        <button
                                            onClick={() => onConfirm(item.id)}
                                            disabled={item.trangThai !== "ChoXacNhan"}
                                            className={`px-2 py-1 rounded-md text-white text-[10px] sm:text-xs shadow ${item.trangThai !== "ChoXacNhan"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700"
                                                }`}
                                        >
                                            Xác nhận
                                        </button>

                                        <button
                                            onClick={() => onReject(item.id)}
                                            disabled={item.trangThai !== "ChoXacNhan"}
                                            className={`px-2 py-1 rounded-md text-white text-[10px] sm:text-xs shadow ${item.trangThai !== "ChoXacNhan"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700"
                                                }`}
                                        >
                                            Từ chối
                                        </button>
                                    </div>
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
