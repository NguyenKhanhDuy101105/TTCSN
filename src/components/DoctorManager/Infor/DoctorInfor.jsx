import React, { useEffect, useState } from 'react';
import Infor from './Infor';
import InforForm from './InforForm';


const DoctorInfor = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const specialties = [
        { id: 1, name: "Cơ xương khớp" },
        { id: 2, name: "Thần kinh" },
        { id: 3, name: "Tiêu hóa" },
        { id: 4, name: "Tim mạch" },
        { id: 5, name: "Tai Mũi Họng" },
        { id: 6, name: "Cột sống" },
    ];

    const degrees = [
        { id: 1, name: "Đa khoa" },
        { id: 2, name: "CKI" },
        { id: 3, name: "CKII" },
        { id: 4, name: "Tiến sĩ" },
        { id: 5, name: "Phó Giáo sư" },
        { id: 6, name: "Giáo Sư" },
        { id: 7, name: "Chuyên gia đầu ngành" },
    ];

    useEffect(() => {
        // FAKE DATA để test giao diện
        const fakeDoctor = {
            doctorId: 1,
            hoTen: "Nguyễn Văn Minh",
            email: "minh.nguyen@example.com",
            soDienThoai: "0905123456",
            gioiTinh: 0, // 0 = Nam
            ngaySinh: "1985-09-15",
            diaChi: "123 Lý Thường Kiệt, Quận 10, TP.HCM",
            avatarUrl: "https://i.pravatar.cc/150?img=12",

            // Chuyên môn
            tenChuyenKhoa: "Cơ xương khớp",
            moTaChuyenKhoa: "Chuyên điều trị thoái hóa khớp, viêm khớp, đau cột sống.",

            // Trình độ
            tenTrinhDo: "Tiến sĩ",
            moTaTrinhDo: "Tốt nghiệp tiến sĩ Y khoa tại Đại học Y Hà Nội.",

            soNamKinhNghiem: 12,
            giaKham: 300000,
            soBenhNhanToiDaMotNgay: 25,
            thoiGianKhamMotCa: 20,

            // Giới thiệu
            gioiThieu: "Bác sĩ chuyên khoa cơ xương khớp với hơn 12 năm kinh nghiệm điều trị cho các bệnh nhân mắc bệnh lý cột sống và xương khớp.",
            quaTrinhDaoTao: "Tốt nghiệp Đại học Y Hà Nội năm 2009; Hoàn thành chương trình Tiến sĩ năm 2016.",
            kinhNghiemLamViec: "Từng công tác tại Bệnh viện Chợ Rẫy và là trưởng khoa Cơ Xương Khớp tại Bệnh viện Việt Đức.",
            thanhTich: "Đạt giải thưởng nghiên cứu khoa học cấp quốc gia năm 2020.",
            chungChi: "Chứng chỉ hành nghề bác sĩ chuyên khoa; Chứng chỉ phẫu thuật nội soi khớp.",

            // Trạng thái làm việc
            trangThaiCongViec: true,
            tongLichKham: 520,
            lichDaHoanThanh: 497,
            danhGiaTrungBinh: 4.8
        };

        // GÁN VÀO STATE
        setUser(fakeDoctor);
    }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     const userJson = localStorage.getItem("user");
    //     if (!userJson) {
    //         console.error("Không tìm thấy dữ liệu user trong localStorage.");
    //         return;
    //     }
    //     const userObject = JSON.parse(userJson);
    //     const userID = userObject.nguoiDungID;
    //     if (!userID) {
    //         console.error("Không tìm thấy ID trong đối tượng user.");
    //         return;
    //     }

    //     fetch(`http://localhost:8080/api/doctors/${userID}`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //         },
    //     })
    //         .then(response => {
    //             if (!response.ok) throw new Error("Lỗi lấy dữ liệu");
    //             return response.json();
    //         })
    //         .then(data => {
    //             setUser(data);
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.error("Lỗi khi gọi API:", error);
    //             alert("Có lỗi xảy ra, vui lòng thử lại!");
    //         });
    // }, []);

    if (!user) return <p>Đang tải thông tin...</p>;

    return (
        <div className='w-full border rounded-[12px] border-gray-300 shadow-md'>
            <h2 className='bg-[#70b8e8] text-white rounded-t-[12px] px-5 py-2 font-bold text-[24px]'>
                Thông tin tài khoản
            </h2>
            <div className='flex px-5 gap-x-5 pt-2'>
                <div className='pt-5 text-center flex flex-col items-center'>
                    <img
                        className='rounded-[50%] size-[120px]'
                        src={user.avatarUrl}
                        alt="avatar"
                    />
                    <p className='font-semibold mt-2'>{user.hoTen}</p>
                </div>
                <div className='flex-1 py-5 ml-5'>
                    {isEditing
                        ? <InforForm
                            user={user}
                            setUser={setUser}
                            setIsEditing={setIsEditing}
                            specialties={specialties}
                            degrees={degrees}
                        />
                        : <Infor user={user} setIsEditing={setIsEditing} />}
                </div>
            </div>
        </div>
    );
};

export default DoctorInfor;
