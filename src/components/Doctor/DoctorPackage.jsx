import React from "react";
import DoctorSchedule from "./DoctorSchedule";
import DoctorClinicInfo from "./DoctorClinicInfo";

const DoctorPackage = ({ schedule, clinic, price, insurance, doctor }) => {
    console.log(doctor)
    return (
        <div className="flex flex-col w-1/2 p-4 border-l border-gray-200">
            <DoctorSchedule schedule={schedule} doctor={doctor} />
            <DoctorClinicInfo clinic={clinic} price={price} insurance={insurance} />
        </div>
    );
};

export default DoctorPackage;
