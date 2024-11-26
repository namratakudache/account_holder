// src/services/timelineService.ts
export const fetchTimelineFromAPI = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("User is not logged in");
  }

  const response = await fetch(
    "https://sandbox-apiconnect.42cards.in/pismo-api/events/v1/timeline?page=1&perPage=20",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch timeline");
  }

  return await response.json();
};
