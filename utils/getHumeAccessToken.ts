import 'server-only';

import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  const apiKey = process.env.HUME_API_KEY;
  const clientSecret = process.env.HUME_CLIENT_SECRET;

  if (!apiKey || !clientSecret) {
    console.error("HUME_API_KEY or HUME_CLIENT_SECRET is not set in environment variables.");
    return null;
  }

  const accessToken = await fetchAccessToken({
    apiKey: apiKey,
    secretKey: clientSecret,
  });

  if (!accessToken) {
    console.error("Failed to fetch Hume access token using provided API key and client secret.");
    return null;
  }

  return accessToken;
};
