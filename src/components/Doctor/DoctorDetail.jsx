import React from 'react';
import DoctorInfo from './DoctorInfor';
import DoctorPackage from './DoctorPackage';
import { Link } from 'react-router-dom'
const DoctorDetail = ({ data }) => {
    console.log(data);
    return (
        <div className="flex border border-gray-300 rounded-lg shadow-md overflow-hidden mb-5">
            <Link
                to={`/doctor/${data.id}`}
                state={{ doctor: data }}
                className="no-underline w-1/2"
            >
                <div className="cursor-pointer">
                    <DoctorInfo doctor={data.doctor} />
                </div>
            </Link>
            <DoctorPackage className="w-1/2"
                doctor={data}
                schedule={data.schedule}
                clinic={data.clinic}
                price={data.price}
                insurance={data.insurance}
            />
        </div>
    );
};

export default DoctorDetail;
