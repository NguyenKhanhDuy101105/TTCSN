import React, { useState } from "react";
import { Eye } from "lucide-react";
import ReactPaginate from "react-paginate";

export default function PatientTableWithPagination({ items = [], onView }) {
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 7;
    const pagesVisited = pageNumber * itemsPerPage;
    const currentItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    return (
        <>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
                <table className="min-w-full bg-white text-left text-sm">
                    <thead className="bg-gray-100 font-semibold text-gray-700">
                        <tr>
                            <th className="p-4 whitespace-nowrap">HỌ TÊN</th>
                            <th className="p-4 whitespace-nowrap">EMAIL</th>
                            <th className="p-4 whitespace-nowrap">SĐT</th>


                            <th className="p-4 whitespace-nowrap hidden md:table-cell">
                                ĐỊA CHỈ
                            </th>

                            <th className="p-4 text-center whitespace-nowrap">
                                THAO TÁC
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    Không có bệnh nhân
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((p) => (
                                <tr
                                    key={p.nguoiDungID}
                                    className="hover:bg-[#fdf8f5] transition"
                                >
                                    <td className="p-4 font-medium text-gray-800">
                                        {p.hoTen}
                                    </td>

                                    <td className="p-4 text-gray-600 max-w-[220px] truncate">
                                        {p.email}
                                    </td>

                                    <td className="p-4 text-gray-600">
                                        {p.soDienThoai}
                                    </td>


                                    <td className="p-4 text-gray-600 hidden md:table-cell">
                                        {p.diaChi || "—"}
                                    </td>

                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => onView(p)}
                                            className="inline-flex items-center justify-center 
                                                       w-9 h-9 rounded-full 
                                                       text-blue-600 hover:bg-blue-100 transition"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            {pageCount > 1 && (
                <div className="flex justify-center sm:justify-end mt-4">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName="flex items-center gap-1 text-sm"
                        pageClassName="px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-100"
                        activeClassName="bg-[#a35a37] text-white"
                        previousClassName="px-3 py-1 border rounded-lg cursor-pointer"
                        nextClassName="px-3 py-1 border rounded-lg cursor-pointer"
                        disabledClassName="opacity-40 cursor-not-allowed"
                    />
                </div>
            )}
        </>
    );
}
