import { useEffect, useState } from "react";
import MedicalHistoryItem from "./MedicalHistoryItem"
import MedicalHistoryDetailModal from "./MedicalHistoryDetailModal";

export default function MedicalHistory() {
    const [histories, setHistories] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const res = await fetch(
                `${API_BASE_URL}/api/bookings/history?page=0&size=10&sortBy=ngayKham&direction=DESC`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true",
                    }
                }
            );

            const json = await res.json();

            const completedList = json.data.content.filter(
                item => item.trangThai === "HOAN_THANH"
            );

            setHistories(completedList);
        } catch (error) {
            console.error("Fetch history error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center">Đang tải...</p>;

    return (
        <div className="w-full border rounded-[12px] border-gray-300 shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Lịch sử khám</h2>

            {histories.length === 0 ? (
                <div className="text-center text-gray-500">
                    Bạn chưa có lịch sử khám bệnh nào
                </div>
            ) : (
                <div className="space-y-3">
                    {histories.map(item => (
                        <MedicalHistoryItem
                            key={item.datLichID}
                            data={item}
                            onViewDetail={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            )}

            {selectedItem && (
                <MedicalHistoryDetailModal
                    data={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}
