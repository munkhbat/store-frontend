const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const api = {
  baseURL: API_BASE_URL,

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data?: object): Promise<T> {
    try {
      console.log("Sending POST request to:", `${API_BASE_URL}${endpoint}`);
      console.log("Request data:", data);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
      });
      
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorText = await response.text();
          console.error("API Error response:", errorText);
          errorMessage = errorText || errorMessage;
        } catch (e) {
          console.error("Could not read error response:", e);
        }
        throw new Error(`API Error: ${errorMessage}`);
      }
      
      const result = await response.json();
      console.log("Success response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      console.error("Error type:", typeof error);
      console.error("Error name:", error instanceof Error ? error.name : 'Unknown');
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown');
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(`Серверт хандах боломжгүй байна. URL: ${API_BASE_URL}${endpoint}`);
      }
      throw error;
    }
  },

  async put<T>(endpoint: string, data?: object): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
};
