import axios from "axios";

// --- Lấy danh sách tất cả trình độ (API công khai, không cần đăng nhập) ---
export const getAllDegrees = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/degrees");
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi lấy danh sách trình độ:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Tạo trình độ mới (chỉ Admin) ---
export const createDegree = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/degrees",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi tạo trình độ mới:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Cập nhật trình độ theo ID (chỉ Admin) ---
export const updateDegree = async (id, data, token) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/degrees/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi cập nhật trình độ:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// --- Xóa mềm trình độ theo ID (chỉ Admin) ---
export const deleteDegree = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/degrees/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi xóa trình độ:", error.response?.data || error.message);
    throw error;
  }
};
