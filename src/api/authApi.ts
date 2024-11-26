export const login = async (clientId: string, encReq: string) => {
  try {
    const response = await fetch(
      "https://sandbox-apiconnect.42cards.in/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ clientId, encReq }), // Send the request body as JSON
      }
    );

    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error: any) {
    throw new Error("Login failed: " + error.message);
  }
};

;

