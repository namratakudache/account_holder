import axios from "axios";

const API_BASE_URL = "https://sandbox-apiconnect.42cards.in/pismo-api/accounts/v1";

// Function to fetch account details
export const fetchAccountDetails = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/${accountId}`);
    return response.data; // Assuming the data is in the response body
  } catch (error: any) {
    // Handle errors gracefully
    console.error("Error fetching account details:", error);
    throw error.response?.data?.message || "Unable to fetch account details";
  }
};
