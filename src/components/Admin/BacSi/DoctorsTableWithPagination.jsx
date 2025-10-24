import React, { useState } from "react";
import { Edit, Trash, Eye } from "lucide-react";
import ReactPaginate from "react-paginate";

export default function DoctorsTableWithPagination({ items, onView, onEdit, onDelete }) {
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 7;
    const pagesVisited = pageNumber * itemsPerPage;

    const currentItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
                <table className="w-full text-left bg-white">
                    <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="p-4">HỌ TÊN</th>
                            <th className="p-4">CHUYÊN KHOA</th>
                            <th className="p-4">CƠ SỞ Y TẾ</th>
                            <th className="p-4">SỐ ĐIỆN THOẠI</th>
                            <th className="p-4">TRẠNG THÁI</th>
                            <th className="p-4 text-center">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    Không tìm thấy bác sĩ nào
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((doctor, index) => (
                                <tr
                                    key={pagesVisited + index}
                                    className="hover:bg-[#fdf8f5] transition"
                                >
                                    <td className="p-4 font-medium text-gray-800">{doctor.name}</td>
                                    <td className="p-4 text-gray-600">{doctor.specialty?.name || "Chưa có"}</td>
                                    <td className="p-4 text-gray-600">{doctor.medical?.name || "Chưa có"}</td>
                                    <td className="p-4 text-gray-600">{doctor.phoneNumber || "Chưa có"}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.status === "active"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {doctor.status === "active" ? "Hoạt động" : "Ngưng"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => onView(pagesVisited + index)}
                                                className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(pagesVisited + index)}
                                                className="text-[#ad7555] hover:text-[#945f46] transition cursor-pointer"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(pagesVisited + index)}
                                                className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Thanh phân trang */}
            {pageCount > 1 && (
                <div className="flex justify-end">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName="flex justify-center items-center gap-2 mt-6"
                        pageClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        activeClassName="bg-[#a35a37] text-white border-[#a35a37]"
                        previousClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        nextClassName="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                        disabledClassName="opacity-40 cursor-not-allowed"
                    />
                </div>
            )}
        </>
    );
}
