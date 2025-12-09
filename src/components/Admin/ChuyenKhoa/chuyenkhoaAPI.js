import axios from "axios";

export const getAllSpecialties = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/specialties");
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi lấy danh sách chuyên khoa:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createSpecialty = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/specialties",
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
      "Lỗi tạo chuyên khoa mới:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteSpecialty = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/specialties/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi xóa chuyên khoa:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateSpecialty = async (id, data, token) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/specialties/${id}`,
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
      "Lỗi cập nhật chuyên khoa:",
      error.response?.data || error.message
    );
    throw error;
  }
};
