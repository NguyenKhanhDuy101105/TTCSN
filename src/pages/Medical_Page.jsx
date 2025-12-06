import React, { useState, useEffect } from 'react';
import HeaderSub from '../components/HeaderSub';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const MedicalPage = () => {
    const [listMedical, setListMedical] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        fetch("http://localhost:8080/api/facilities", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                // Map dữ liệu API sang format UI cần
                const mapped = data.map(item => ({
                    id: item.coSoID,
                    name: item.tenCoSo,
                    image: item.anhDaiDien || item.logo || "", // fallback nếu không có ảnh
                    path: "" // giữ nguyên nếu cần
                }));
                setListMedical(mapped);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <HeaderSub />
            <div className='max-w-[1300px] xl:mx-auto mx-5'>
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i className="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Cơ sở y tế</span>
                </p>
                <h2 className='font-semibold text-[18px] pt-3'>Danh sách cơ sở y tế</h2>
                <div className='mt-5'>
                    {listMedical.map((item, index) => (
                        <Link className='flex gap-x-3 items-center mb-5 border-b-1 pb-5 border-gray-300'
                            key={index} to={item.path}>
                            <img className='w-[160px] h-[120px] object-cover'
                                src={item.image} alt={item.name} />
                            <div>
                                <h3 className='font-medium'>{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MedicalPage;
