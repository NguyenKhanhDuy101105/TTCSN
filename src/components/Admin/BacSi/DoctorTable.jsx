import React from "react";
import { Eye, Edit, Trash, RotateCw } from "lucide-react";
import ReactPaginate from "react-paginate";

export default function DoctorsTable({ items, onView, onEdit, onDelete, onRestore, page, setPage, totalPages }) {
    const handlePageChange = ({ selected }) => {
        setPage(selected);
    };

    return (
        <>
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
                <table className="w-full text-left bg-white">
                    <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="p-4">Tên bác sĩ</th>
                            <th className="p-4">Chuyên khoa</th>
                            <th className="p-4">Số điện thoại</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    Không tìm thấy bác sĩ
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.bacSiID} className="hover:bg-[#fdf8f5] transition">
                                    <td className="p-4 font-medium text-gray-800">{item.hoTen}</td>
                                    <td className="p-4 text-gray-600">{item.tenChuyenKhoa}</td>
                                    <td className="p-4 text-gray-600">{item.soDienThoai}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1.5 rounded-[8px] font-medium text-white 
                                            ${item.trangThaiCongViec ? "bg-green-600" : "bg-red-600"}`}
                                        >
                                            {item.trangThaiCongViec ? "Hoạt động" : "Ngưng hoạt động"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => onView(item)} className="text-blue-500 hover:text-sky-700 transition">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => onEdit(item)} className="text-[#ad7555] hover:text-[#945f46] transition">
                                                <Edit size={18} />
                                            </button>
                                            {item.deleted ? (
                                                <button onClick={() => onRestore(item)} className="text-green-500 hover:text-green-700 transition">
                                                    <RotateCw size={18} />
                                                </button>
                                            ) : (
                                                <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-700 transition">
                                                    <Trash size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-end mt-6">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        containerClassName="flex gap-2"
                        pageClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                        activeClassName="bg-[#a35a37] text-white border-[#a35a37]"
                        previousClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                        nextClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                        disabledClassName="opacity-40 cursor-not-allowed"
                        forcePage={page}
                    />
                </div>
            )}
        </>
    );
}
