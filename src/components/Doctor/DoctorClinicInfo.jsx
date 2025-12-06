import React from "react";

const DoctorClinicInfo = ({ doctor }) => {


    const formatCurrency = (value) => {
        if (!value) return "0";
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div>
            <div className="mt-2 flex flex-col gap-y-1">
                <p className="font-semibold">ĐỊA CHỈ KHÁM</p>
                <p className="text-sky-700 font-bold">tên cơ sở: Bệnh viện Bạch Mai</p>
                <p className="text-[16px]">địa chỉ: 78 Giải Phóng, Đống Đa, Hà Nội</p>
            </div>

            <div className="mt-2">
                <p className="font-semibold">GIÁ KHÁM:<span className="font-medium ml-2 text-[16px]">{formatCurrency(doctor.giaKham)} vnđ</span> </p>
            </div>
        </div>
    );
};

export default DoctorClinicInfo;
