import { CDP_CLIENT_ID, ONRAMP_API_BASE_URL } from "@/constants/constants";
import type { OnrampOptionsResponseData } from "@/constants/types";
import { convertSnakeToCamelCase } from "./convertSnakeToCamelCase";

/**
 * Returns supported fiat currencies and available crypto assets that can be passed into the Buy Quote API.
 *
 * @param country ISO 3166-1 two-digit country code string representing the purchasing user’s country of residence, e.g., US. `required`
 * @param subdivision ISO 3166-2 two-digit country subdivision code representing the purchasing user’s subdivision of residence within their country, e.g. `NY`.
 */
export async function fetchOnrampOptions({
  country,
  subdivision,
}: {
  country: string;
  subdivision?: string;
}): Promise<OnrampOptionsResponseData> {
  let queryParams = `?country=${country}`;

  if (subdivision) {
    queryParams = `${queryParams}&subdivision=${subdivision}`;
  }

  const response = await fetch(
    `${ONRAMP_API_BASE_URL}/buy/options${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CDP_CLIENT_ID}`,
      },
    }
  );

  const responseJson = await response.json();

  return convertSnakeToCamelCase<OnrampOptionsResponseData>(responseJson);
}
