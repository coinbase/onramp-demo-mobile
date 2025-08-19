type SessionTokenResponse = {
  token: string;
  channel_id: string;
};

type GenerateSessionTokenParams = {
  walletAddress: string;
  walletChain: string;
  asset: string;
  apiClient: {
    post: <T>(endpoint: string, data: any) => Promise<T>;
  };
};

export const generateSessionToken = async ({
  walletAddress,
  walletChain,
  asset,
  apiClient,
}: GenerateSessionTokenParams): Promise<SessionTokenResponse> => {
  const payload = {
    addresses: [
      {
        address: walletAddress,
        blockchains: [walletChain]
      }
    ],
    assets: [asset]
  };

  const response = await apiClient.post<SessionTokenResponse>(
    "/onramp/generate-session-token",
    payload
  );

  return response;
}; 