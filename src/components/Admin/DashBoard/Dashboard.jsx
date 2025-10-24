// Dashboard.jsx
import React from "react";
import { medicalCenters, specialties, doctors, services } from "./Data";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
    // --- Tính số liệu tổng quan ---
    const totalMedicalCenters = medicalCenters.length;
    const totalSpecialties = specialties.length;
    const totalDoctors = doctors.length;
    const totalServices = services.length;

    // --- Lấy số liệu lịch hẹn hôm nay giả lập ---
    const todayAppointments = Math.floor(Math.random() * 20) + 5;

    // --- Dữ liệu PieChart: số bác sĩ theo trạng thái ---
    const doctorStatusData = [
        { name: "Active", value: doctors.filter(d => d.status === "active").length },
        { name: "Inactive", value: doctors.filter(d => d.status === "inactive").length },
    ];
    const COLORS = ["#0088FE", "#FF8042"];

    // --- Dữ liệu BarChart: số bác sĩ theo chuyên khoa ---
    const doctorsPerSpecialty = specialties.map(spec => ({
        name: spec.name,
        count: doctors.filter(d => d.specialtyId === spec.id).length,
    }));

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Dashboard</h1>

            {/* --- Cards tổng quan --- */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
                <div style={{ padding: "20px", background: "#f2f2f2", borderRadius: "10px", flex: 1 }}>
                    <h3>Tổng số cơ sở y tế</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalMedicalCenters}</p>
                </div>
                <div style={{ padding: "20px", background: "#f2f2f2", borderRadius: "10px", flex: 1 }}>
                    <h3>Tổng số chuyên khoa</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalSpecialties}</p>
                </div>
                <div style={{ padding: "20px", background: "#f2f2f2", borderRadius: "10px", flex: 1 }}>
                    <h3>Tổng số bác sĩ</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalDoctors}</p>
                </div>
                <div style={{ padding: "20px", background: "#f2f2f2", borderRadius: "10px", flex: 1 }}>
                    <h3>Tổng số dịch vụ</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalServices}</p>
                </div>
                <div style={{ padding: "20px", background: "#f2f2f2", borderRadius: "10px", flex: 1 }}>
                    <h3>Lịch hẹn hôm nay</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{todayAppointments}</p>
                </div>
            </div>

            {/* --- PieChart: trạng thái bác sĩ --- */}
            <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
                <div>
                    <h3>Số bác sĩ theo trạng thái</h3>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={doctorStatusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {doctorStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                {/* --- BarChart: số bác sĩ theo chuyên khoa --- */}
                <div>
                    <h3>Số bác sĩ theo chuyên khoa</h3>
                    <BarChart width={500} height={300} data={doctorsPerSpecialty}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
