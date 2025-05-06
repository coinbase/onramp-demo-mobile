const BASE_URL = "https://pay.coinbase.com/api/v2";
// REMOVE THIESE HARDCODED VALUES LATER
const TEST_APP_ID = "1492f9ed-46d5-4f85-b547-c888a9981625"
const TEST_API_KEY = "13d24c60-a94e-4eab-888e-e5b995d88aa7"

export function useApiClient() {

  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    try {

      return {
        "Cbpay-App-Id": TEST_APP_ID,
        "Cbpay-Api-Key": TEST_API_KEY,
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
