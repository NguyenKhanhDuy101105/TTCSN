import axios from "axios";

const API_BASE = "http://localhost:8080/api/schedules";

export const createSchedule = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.post(API_BASE, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createBulkSchedules = async (schedules = []) => {
  try {
    const token = localStorage.getItem("accessToken");

    const payload = {
      schedules,
      totalDays: 0,
      totalSchedules: schedules.length,
      summary: "Tạo lịch mặc định",
    };

    const res = await axios.post(`${API_BASE}/bulk`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.delete(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllSchedules = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(API_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Lỗi lấy lịch:", error);
    throw error.response?.data || error;
  }
};
