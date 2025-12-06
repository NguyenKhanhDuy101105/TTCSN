import React from "react";
import { FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const BookingItem = ({ items, onCancel, onCancelPayment }) => {
    return (
        <>
            {items.map((item, index) => {
                const isOnlinePayment =
                    item.tenPhuongThucThanhToan !== "Tiền mặt tại phòng khám";

                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow p-3 border border-gray-300 mb-3"
                    >

                        <div className="flex justify-between">
                            <div className="flex items-center gap-3 pb-2 border-gray-300">
                                <img
                                    src={item.avatarBacSi}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full object-cover border"
                                />

                                <div className="leading-tight">
                                    <p className="font-semibold text-base">{item.tenBacSi}</p>
                                    <p className="text-gray-600 text-sm">
                                        {item.tenChuyenKhoa} • {item.tenTrinhDo}
                                    </p>
                                </div>
                            </div>


                            <div className="mt-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-600" />
                                    <span className="font-semibold">Ngày khám: {item.ngayKham}</span>
                                </div>

                                <p className="mt-1">
                                    <span className=" font-semibold">Giờ khám: {item.gioKham}</span>
                                </p>
                            </div>
                        </div>


                        <div className="mt-2 text-[14px] border-t border-gray-300 pt-2 font-medium">
                            <p><strong>Bệnh nhân: </strong> {item.tenBenhNhan}</p>
                            <p><strong>SĐT: </strong> {item.sdtBenhNhan}</p>
                        </div>


                        <div className="flex justify-between items-center mt-2 border-t border-gray-300 pt-2 text-sm">
                            <div className="font-medium">
                                <p><strong>Giá khám:</strong> {item.giaKhamDisplay}</p>
                                <p><strong>Phương thức thanh toán:</strong> {item.tenPhuongThucThanhToan}</p>
                                <p><strong>Trạng thái:</strong> {item.tenTrangThaiThanhToan}</p>
                                <p><strong>Trạng thái lịch:</strong> {item.tenTrangThai}</p>
                            </div>

                            <div className="flex gap-2">
                                {item.canCancel && (
                                    <button
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded-lg text-xs"
                                        onClick={() => onCancel(item.datLichID)}
                                    >
                                        <MdCancel size={14} />
                                        Huỷ
                                    </button>
                                )}

                                {isOnlinePayment && (
                                    <button
                                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded-lg text-xs"
                                        onClick={() => onCancelPayment(item.datLichID)}
                                    >
                                        <FaMoneyBill size={14} />
                                        Thanh toán
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default BookingItem;
