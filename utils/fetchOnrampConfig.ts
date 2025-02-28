import { CDP_CLIENT_ID, ONRAMP_API_BASE_URL } from "@/constants/constants";
import type { OnrampConfigResponseData } from "@/constants/types";
import { convertSnakeToCamelCase } from "./convertSnakeToCamelCase";

/**
 * Returns list of countries supported by Coinbase Onramp, and the payment methods available in each country.
 */
export async function fetchOnrampConfig(): Promise<OnrampConfigResponseData> {
  const response = await fetch(`${ONRAMP_API_BASE_URL}/buy/config`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CDP_CLIENT_ID}`,
    },
  });

  const responseJson = await response.json();

  return convertSnakeToCamelCase<OnrampConfigResponseData>(responseJson);
}
