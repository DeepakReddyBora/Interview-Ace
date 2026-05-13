import axios from "axios";

const API_URL =
  "https://interview-ace-backend-ed6s.onrender.com/api/interview";

export const generateInterview = async (
  formData
) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/generate`,
    formData,
    config
  );

  return response.data;
};