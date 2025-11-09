import React from 'react';

const DoctorInfo = ({ doctor }) => {
    return (
        <div className="flex flex-col p-4">
            <div className="flex items-start mb-2">
                <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-full object-cover mr-4" />
                <div>
                    <h2 className="text-xl font-bold text-sky-600">Bác sĩ {doctor.name}</h2>
                    <p className="text-gray-700 mb-1 text-[15px]">{doctor.description}</p>
                    <p className="text-gray-700 mb-1 text-[15px]">{doctor.position}</p>
                    <p className="text-gray-700 mb-1 text-[15px]">{doctor.note}</p>
                    <div className="flex items-center text-gray-500 mt-2 text-[15px]">
                        <i className="fa fa-map-marker mr-1"></i> {doctor.location}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DoctorInfo;
