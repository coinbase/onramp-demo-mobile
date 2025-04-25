import { usePrivy } from "@privy-io/expo";
import { createToken }  from '../utils/jwtTokenGeneration';

const BASE_URL = "http://localhost:3000";
// "https://onramp-demo-server-c1zd230h2-rustam-cbs-projects.vercel.app";

export function useApiClient() {
  const { getAccessToken } = usePrivy();


  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    try {
      const token = await getAccessToken();
      const jwtToken = await createToken("GET", "/onramp/create-order");
      console.log("JWT Token", jwtToken);
      if (!token) {
        throw new Error("No access token available");
      }

      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } catch (error) {
      console.error("Error getting auth headers:", error);
      throw error;
    }
  };

  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    try {
      const headers = await getAuthHeaders();

      console.log("Headers", headers);
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  // Convenience methods for common HTTP methods
  const get = <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" });

  const post = <T>(endpoint: string, data: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });

  const put = <T>(endpoint: string, data: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });

  const del = <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" });

  return {
    request,
    get,
    post,
    put,
    delete: del,
  };
}
