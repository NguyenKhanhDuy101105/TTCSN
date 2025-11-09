import React from "react";

const DoctorClinicInfo = ({ clinic, price, insurance }) => {
    return (
        <div>
            <div className="mt-2">
                <p className="font-semibold">ĐỊA CHỈ KHÁM</p>
                <p className="text-sky-600">{clinic.name}</p>
                <p>{clinic.address}</p>
            </div>

            <div className="mt-2">
                <p className="font-semibold">GIÁ KHÁM:</p>
                <p>
                    {price.formatted}{" "}
                    <a href="#" className="text-sky-600 text-sm">
                        Xem chi tiết
                    </a>
                </p>
            </div>

            <div className="mt-2">
                <p className="font-semibold">LOẠI BẢO HIỂM ÁP DỤNG:</p>
                <a
                    href={insurance.detailUrl}
                    className="text-sky-600 text-sm"
                >
                    Xem chi tiết
                </a>
            </div>
        </div>
    );
};

export default DoctorClinicInfo;
