const BASE_URL = "https://pay.coinbase.com/api/v2";
// "https://onramp-demo-server-c1zd230h2-rustam-cbs-projects.vercel.app";
// REMOVE THIESE HARDCODED VALUES LATER
const TEST_APP_ID = "1492f9ed-46d5-4f85-b547-c888a9981625"
const TEST_API_KEY = "13d24c60-a94e-4eab-888e-e5b995d88aa7"

export function useApiClient() {

  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    try {
      // const token = await getAccessToken();
      // const jwtToken = await createToken("GET", "/onramp/create-order");
      // console.log("JWT Token", jwtToken);
      // if (!token) {
      //   throw new Error("No access token available");
      // }

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
https://media.github.cbhq.net/user/1270/files/6bf0b5bf-9abc-4ed6-80f2-7ecaa88d3470?token=AAAAWMGYNH5OCFV3P55IGNTIB7BWG
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
