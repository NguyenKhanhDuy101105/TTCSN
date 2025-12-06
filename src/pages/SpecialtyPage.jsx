import React, { useState, useEffect } from 'react'
import HeaderSub from '../components/HeaderSub'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const SpecialtyPage = () => {

    const [listSpecialty, setListSpecialty] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/api/specialties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Lỗi lấy dữ liệu");
                return response.json();
            })
            .then(data => {
                setListSpecialty(data)
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            });
    }, [])


    return (
        <div>
            <HeaderSub />
            <div className=' max-w-[1300px] xl:mx-auto mx-5'>
                <p className='pt-5'>
                    <Link to="/" className='text-blue-400'><i class="fa-solid fa-house"></i></Link>
                    <span className='mx-1.5 text-blue-400'>/</span>
                    <span className='font-medium'>Khám chuyên khoa</span>
                </p>
                <ul className='flex flex-wrap gap-x-5 gap-y-5 pt-5'>
                    {listSpecialty.map(e => (
                        <Link key={e.chuyenKhoaID} to={`/chuyenkhoa/${e.chuyenKhoaID}`}>
                            <img className='w-[310px] h-[161px]'
                                src={e.anhDaiDien}
                                alt="" />
                            <p className='font-semibold mt-1'>{e.tenChuyenKhoa}</p>
                        </Link>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default SpecialtyPage
