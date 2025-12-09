import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const API_URL = "http://localhost:8080/api/bookings/statistics";

export default function BookingStatisticsDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(res.data.data);
            } catch (err) {
                console.error("Lỗi lấy thống kê:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-6 text-gray-500">Đang tải thống kê...</div>;
    }

    if (!stats) {
        return <div className="p-6 text-red-500">Không có dữ liệu thống kê</div>;
    }


    const bookingStatusData = {
        labels: [
            "Chờ duyệt",
            "Chờ thanh toán",
            "Đã xác nhận",
            "Đang khám",
            "Hoàn thành",
            "Hủy",
            "Không đến",
            "Từ chối",
        ],
        datasets: [
            {
                data: [
                    stats.pendingApproval,
                    stats.pendingPayment,
                    stats.confirmed,
                    stats.inProgress,
                    stats.completed,
                    stats.cancelled,
                    stats.noShow,
                    stats.rejected,
                ],
                backgroundColor: [
                    "#fbbf24",
                    "#60a5fa",
                    "#34d399",
                    "#a78bfa",
                    "#22c55e",
                    "#ef4444",
                    "#f97316",
                    "#9ca3af",
                ],
            },
        ],
    };

    const ratingData = {
        labels: ["5 ★", "4 ★", "3 ★", "2 ★", "1 ★"],
        datasets: [
            {
                label: "Số lượt đánh giá",
                data: [
                    stats.fiveStars,
                    stats.fourStars,
                    stats.threeStars,
                    stats.twoStars,
                    stats.oneStar,
                ],
                backgroundColor: "#ad7555",
                borderRadius: 6,
            },
        ],
    };


    return (
        <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard title="Tổng booking" value={stats.totalBookings} />
                <StatCard title="Booking hôm nay" value={stats.todayBookings} />
                <StatCard
                    title="Doanh thu hôm nay"
                    value={stats.todayRevenue.toLocaleString() + " đ"}
                />
                <StatCard
                    title="Doanh thu tháng"
                    value={stats.thisMonthRevenue.toLocaleString() + " đ"}
                />
                <StatCard
                    title="Doanh thu năm"
                    value={stats.totalRevenue.toLocaleString() + " đ"}
                />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4 text-gray-700">
                        Booking theo trạng thái
                    </h3>
                    <div className="h-[260px] flex justify-center">
                        <Pie
                            data={bookingStatusData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="font-semibold mb-4 text-gray-700">
                        Đánh giá dịch vụ
                    </h3>
                    <div className="h-[260px]">
                        <Bar
                            data={ratingData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: { stepSize: 1 },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MiniStat label="Đã thanh toán" value={stats.paidBookings} />
                <MiniStat label="Chưa thanh toán" value={stats.unpaidBookings} />
                <MiniStat
                    label="Hoàn tiền"
                    value={stats.totalRefund.toLocaleString() + " đ"}
                />
            </div>
        </div>
    );
}


const StatCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-2 text-gray-800">{value}</p>
    </div>
);

const MiniStat = ({ label, value }) => (
    <div className="bg-white p-5 rounded-2xl shadow">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
);
