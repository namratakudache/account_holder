// src/types/timelineTypes.ts

export interface TimelineData {
  id: string;
  name: string;
  date: string;
  description: string;
}

export interface TimelineResponse {
  data: TimelineData[];
  // Add other properties from the response if needed
}

export interface TimelineState {
  isLoggedIn: boolean;
  timeline: TimelineData[];
  loading: boolean;
  error: string | null;
}
